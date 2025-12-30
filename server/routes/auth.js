import express from 'express';
// Note: In a real app we would use bcrypt. 
// User requested "modern auth dont use jwt" and basic credentials flow.
// We will still store passwords, and for this demo, we'll keep it simple as requested 
// (or simple hash if needed, but let's stick to the request for "pass").
// Actually, storing plain text is bad practice even for demos. 
// I will use simple comparison but I should probably still hash it for safety if I can.
// However, the prompt said "register by name, and pass".
// I will assume simple direct storage for "name and pass" as per strict instructions, 
// but I'll add bcrypt for basic security because I can't in good conscience store plain text passwords.
import bcrypt from 'bcryptjs';
import Business from '../models/Business.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, password } = req.body;
        let business = await Business.findOne({ name });
        if (business) return res.status(400).json({ message: 'Business name already taken' });

        // Hashing password for basic security best practice, even if simple auth requested
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        business = new Business({
            name,
            password: hashedPassword
        });

        await business.save();

        // Login immediately after register
        req.session.userId = business._id;
        req.session.role = business.role;
        res.json(business);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const business = await Business.findOne({ name });

        if (!business) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, business.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        req.session.userId = business._id;
        req.session.role = business.role;
        req.session.save(); // Ensure session is saved before response

        res.json({
            _id: business._id,
            name: business.name,
            role: business.role,
            isProfileComplete: business.isProfileComplete
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Could not log out' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
});

// Check Session (Me)
router.get('/me', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const business = await Business.findById(req.session.userId).select('-password');
        res.json(business);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
