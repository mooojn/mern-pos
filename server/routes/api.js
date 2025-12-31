import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/Item.js';
import Supplier from '../models/Supplier.js';
import Transaction from '../models/Transaction.js';
import Business from '../models/Business.js';

const router = express.Router();

// Middleware to ensure authentication
const ensureAuth = (req, res, next) => {
    if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });
    next();
};

router.use(ensureAuth);

// --- Items ---
router.get('/items', async (req, res) => {
    const items = await Item.find({ businessId: req.session.userId }).populate('supplier');
    res.json(items);
});

router.post('/items', async (req, res) => {
    try {
        const item = new Item({ ...req.body, businessId: req.session.userId });
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/items/:id', async (req, res) => {
    try {
        const item = await Item.findOneAndUpdate(
            { _id: req.params.id, businessId: req.session.userId },
            req.body,
            { new: true }
        );
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/items/:id', async (req, res) => {
    await Item.findOneAndDelete({ _id: req.params.id, businessId: req.session.userId });
    res.json({ message: 'Deleted' });
});

// --- Suppliers ---
router.get('/suppliers', async (req, res) => {
    const suppliers = await Supplier.find({ businessId: req.session.userId });
    res.json(suppliers);
});

router.post('/suppliers', async (req, res) => {
    try {
        const supplier = new Supplier({ ...req.body, businessId: req.session.userId });
        await supplier.save();
        res.json(supplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/suppliers/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findOneAndUpdate(
            { _id: req.params.id, businessId: req.session.userId },
            req.body,
            { new: true }
        );
        res.json(supplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/suppliers/:id', async (req, res) => {
    await Supplier.findOneAndDelete({ _id: req.params.id, businessId: req.session.userId });
    res.json({ message: 'Deleted' });
});

// --- Transactions / Sales ---
router.get('/transactions', async (req, res) => {
    const transactions = await Transaction.find({ businessId: req.session.userId })
        .populate('itemId')
        .sort({ date: -1 });
    res.json(transactions);
});

router.post('/transactions', async (req, res) => {
    try {
        const { itemId, quantity, type, price } = req.body; // price per unit
        const item = await Item.findOne({ _id: itemId, businessId: req.session.userId });

        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (type === 'sale') {
            if (item.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient inventory' });
            }
            item.quantity -= quantity;
        } else {
            item.quantity = Number(item.quantity) + Number(quantity);
        }

        await item.save();

        const totalAmount = price * quantity;
        const transaction = new Transaction({
            businessId: req.session.userId,
            itemId,
            type,
            quantity,
            totalAmount
        });

        await transaction.save();
        res.json(transaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/transactions/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, businessId: req.session.userId });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        // If it was a sale, restock the item
        if (transaction.type === 'sale') {
            const item = await Item.findOne({ _id: transaction.itemId });
            if (item) {
                item.quantity += transaction.quantity;
                await item.save();
            }
        }

        res.json({ message: 'Transaction voided', transaction });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- Settings ---
router.put('/settings', async (req, res) => {
    try {
        const business = await Business.findByIdAndUpdate(
            req.session.userId,
            { ...req.body, isProfileComplete: true },
            { new: true }
        ).select('-password');
        res.json(business);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- Reports (Basic) ---
router.get('/reports', async (req, res) => {
    try {
        const businessId = new mongoose.Types.ObjectId(req.session.userId);

        // Sales Report
        const sales = await Transaction.aggregate([
            { $match: { businessId, type: 'sale' } },
            { $group: { _id: null, totalSales: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
        ]);

        // Inventory Value
        const inventory = await Item.aggregate([
            { $match: { businessId } },
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: { $multiply: ["$price", "$quantity"] } },
                    itemsCount: { $sum: 1 },
                    lowStockCount: { $sum: { $cond: [{ $lt: ["$quantity", 10] }, 1, 0] } }
                }
            }
        ]);

        const supplierCount = await Supplier.countDocuments({ businessId: req.session.userId });

        res.json({
            totalSales: sales[0]?.totalSales || 0,
            transactionCount: sales[0]?.count || 0,
            inventoryValue: inventory[0]?.totalValue || 0,
            lowStockCount: inventory[0]?.lowStockCount || 0,
            totalItems: inventory[0]?.itemsCount || 0,
            totalSuppliers: supplierCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error generating report' });
    }
});

// --- Admin Routes ---
const ensureAdmin = async (req, res, next) => {
    const business = await Business.findById(req.session.userId);
    if (!business || business.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin only' });
    }
    next();
};

// Get all businesses (Admin only)
router.get('/admin/businesses', ensureAdmin, async (req, res) => {
    try {
        const businesses = await Business.find({ role: 'business' }).select('-password');

        // Get stats for each business
        const businessesWithStats = await Promise.all(businesses.map(async (business) => {
            const itemCount = await Item.countDocuments({ businessId: business._id });
            const transactionCount = await Transaction.countDocuments({ businessId: business._id });
            const supplierCount = await Supplier.countDocuments({ businessId: business._id });

            return {
                ...business.toObject(),
                stats: {
                    items: itemCount,
                    transactions: transactionCount,
                    suppliers: supplierCount
                }
            };
        }));

        res.json(businessesWithStats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching businesses' });
    }
});

// Delete a business (Admin only)
router.delete('/admin/businesses/:id', ensureAdmin, async (req, res) => {
    try {
        const businessId = req.params.id;

        // Delete all related data
        await Item.deleteMany({ businessId });
        await Supplier.deleteMany({ businessId });
        await Transaction.deleteMany({ businessId });
        await Business.findByIdAndDelete(businessId);

        res.json({ message: 'Business and all related data deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting business' });
    }
});

// Create a new business (Admin only)
router.post('/admin/businesses', ensureAdmin, async (req, res) => {
    try {
        const { name, password, contactEmail, phone, address } = req.body;

        // Check if name already exists
        const existing = await Business.findOne({ name });
        if (existing) {
            return res.status(400).json({ message: 'Business name already exists' });
        }

        // Hash password
        const bcrypt = await import('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const business = new Business({
            name,
            password: hashedPassword,
            contactEmail,
            phone,
            address,
            role: 'business',
            isProfileComplete: !!(contactEmail && phone && address)
        });

        await business.save();
        res.json({ ...business.toObject(), password: undefined });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating business' });
    }
});

// Update a business (Admin only)
router.put('/admin/businesses/:id', ensureAdmin, async (req, res) => {
    try {
        const { name, contactEmail, phone, address, password } = req.body;
        const updateData = { name, contactEmail, phone, address };

        // If password provided, hash it
        if (password) {
            const bcrypt = await import('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        updateData.isProfileComplete = !!(contactEmail && phone && address);

        const business = await Business.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).select('-password');

        res.json(business);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating business' });
    }
});

export default router;
