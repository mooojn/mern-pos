import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'business'],
        default: 'business',
    },
    // Profile Settings
    contactEmail: { type: String },
    phone: { type: String },
    address: { type: String },
    isProfileComplete: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Business', businessSchema);
