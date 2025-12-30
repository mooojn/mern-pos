import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';

const Settings = () => {
    const [formData, setFormData] = useState({ contactEmail: '', phone: '', address: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Ideally fetch current user profile here
        axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
            .then(res => {
                const { contactEmail, phone, address } = res.data;
                setFormData({ contactEmail: contactEmail || '', phone: phone || '', address: address || '' });
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/settings', formData, { withCredentials: true });
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Error updating profile');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Business Settings</h1>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-6 pb-2 border-b">Complete Your Profile</h2>
                {message && <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded">{message}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-1">Contact Email</label>
                        <input
                            type="email"
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                            value={formData.contactEmail}
                            onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Business Address</label>
                        <textarea
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                            rows="3"
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                        ></textarea>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2">
                        <Save size={18} /> Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
