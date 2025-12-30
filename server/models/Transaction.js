import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },
    type: {
        type: String,
        enum: ['sale', 'purchase'],
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
