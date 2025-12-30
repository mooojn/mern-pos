import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },
    name: { type: String, required: true },
    sku: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
