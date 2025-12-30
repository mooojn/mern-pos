import { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        experience: '',
        availability: ''
    });
    const [message, setMessage] = useState('');

    const { name, specialization, experience, availability } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const availabilityArray = availability.split(',').map(item => item.trim()); // Convert comma string to array

            await axios.post('http://localhost:5000/api/doctors',
                { ...formData, availability: availabilityArray },
                { headers: { 'x-auth-token': token } }
            );
            setMessage('Doctor created successfully!');
            setFormData({ name: '', specialization: '', experience: '', availability: '' });
        } catch (err) {
            setMessage('Error creating doctor');
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            <div className="bg-white p-8 rounded shadow-md max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Add New Doctor</h2>
                {message && <p className={`mb-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}

                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Doctor Name</label>
                        <input type="text" name="name" value={name} onChange={onChange} className="w-full border p-2 rounded" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Specialization</label>
                        <input type="text" name="specialization" value={specialization} onChange={onChange} className="w-full border p-2 rounded" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Experience (Years)</label>
                        <input type="number" name="experience" value={experience} onChange={onChange} className="w-full border p-2 rounded" required />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Availability (comma separated, e.g., 09:00, 10:00)</label>
                        <input type="text" name="availability" value={availability} onChange={onChange} className="w-full border p-2 rounded" required />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-semibold">
                        Add Doctor
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminPanel;
