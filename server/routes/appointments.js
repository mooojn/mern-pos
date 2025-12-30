import express from 'express';
import Appointment from '../models/Appointment.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user's appointments
router.get('/', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user.id })
            .populate('doctorId', 'name specialization');
        res.json(appointments);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Book an appointment
router.post('/', auth, async (req, res) => {
    const { doctorId, date } = req.body;

    try {
        const newAppointment = new Appointment({
            userId: req.user.id,
            doctorId,
            date,
            status: 'pending'
        });

        const appointment = await newAppointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
