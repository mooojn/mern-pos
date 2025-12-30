import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    availability: {
        type: [String], // e.g., ['09:00', '10:00', '11:00']
        default: [],
    },
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);
