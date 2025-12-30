import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Phone, Mail } from 'lucide-react';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', contact: '', email: '' });

    const fetchSuppliers = async () => {
        try {
            const res = await api.get('/suppliers');
            setSuppliers(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchSuppliers(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/suppliers', formData);
        setShowForm(false);
        setFormData({ name: '', contact: '', email: '' });
        fetchSuppliers();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Supplier Directory</h1>
                <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Plus size={18} /> Add Supplier
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input placeholder="Supplier Name" className="border p-2 rounded" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        <input placeholder="Contact Phone" className="border p-2 rounded" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
                        <input placeholder="Email" className="border p-2 rounded" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        <button className="md:col-start-3 bg-blue-600 text-white p-2 rounded">Save Supplier</button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suppliers.map(s => (
                    <div key={s._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{s.name}</h3>
                        <div className="text-gray-500 space-y-2">
                            <p className="flex items-center gap-2"><Phone size={16} /> {s.contact || 'N/A'}</p>
                            <p className="flex items-center gap-2"><Mail size={16} /> {s.email || 'N/A'}</p>
                        </div>
                    </div>
                ))}
                {suppliers.length === 0 && <p className="text-gray-500 col-span-full text-center py-10">No suppliers found.</p>}
            </div>
        </div>
    );
};

export default Suppliers;
