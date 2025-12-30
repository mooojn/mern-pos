import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Business from './models/Business.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        const adminName = 'admin';
        const adminExists = await Business.findOne({ name: adminName });

        if (adminExists) {
            console.log('⚠️ Admin already exists');
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin', salt);

        const adminUser = new Business({
            name: adminName,
            password: hashedPassword,
            role: 'admin',
            isProfileComplete: true
        });

        await adminUser.save();
        console.log('✅ Admin created: admin / admin');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
