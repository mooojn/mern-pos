import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },
    name: { type: String, required: true },
    contact: { type: String },
    email: { type: String },
}, { timestamps: true });

export default mongoose.model('Supplier', supplierSchema);
