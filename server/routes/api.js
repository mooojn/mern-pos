import express from 'express';
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
    // Basic aggregation
    const sales = await Transaction.aggregate([
        { $match: { businessId: new mongoose.Types.ObjectId(req.session.userId), type: 'sale' } },
        { $group: { _id: null, totalSales: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
    ]);
    res.json(sales[0] || { totalSales: 0, count: 0 });
});

export default router;
