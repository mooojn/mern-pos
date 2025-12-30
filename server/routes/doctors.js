import express from 'express';
import Doctor from '../models/Doctor.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a doctor (Admin only - simplified for now)
router.post('/', auth, async (req, res) => {
    const { name, specialization, experience, availability } = req.body;

    try {
        const newDoctor = new Doctor({
            name,
            specialization,
            experience,
            availability
        });
        const doctor = await newDoctor.save();
        res.json(doctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
