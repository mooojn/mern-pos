import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Phone, Mail, Edit2, Trash2, X } from 'lucide-react';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', contact: '', email: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchSuppliers = async () => {
        try {
            const res = await api.get('/suppliers');
            setSuppliers(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchSuppliers(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/suppliers/${editingId}`, formData);
            } else {
                await api.post('/suppliers', formData);
            }
            setShowForm(false);
            setEditingId(null);
            setFormData({ name: '', contact: '', email: '' });
            fetchSuppliers();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (supplier) => {
        setFormData({ name: supplier.name, contact: supplier.contact, email: supplier.email });
        setEditingId(supplier._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this supplier?')) return;
        try {
            await api.delete(`/suppliers/${id}`);
            fetchSuppliers();
        } catch (err) {
            console.error(err);
        }
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: '', contact: '', email: '' });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Supplier Directory</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <Plus size={18} /> Add Supplier
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 w-full max-w-md animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{editingId ? 'Edit Supplier' : 'Add New Supplier'}</h2>
                            <button onClick={closeForm} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Supplier Name</label>
                                <input
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact Phone</label>
                                <input
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.contact}
                                    onChange={e => setFormData({ ...formData, contact: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email Address</label>
                                <input
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={closeForm} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    {editingId ? 'Update Supplier' : 'Save Supplier'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suppliers.map(s => (
                    <div key={s._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group relative">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button onClick={() => handleEdit(s)} className="p-2 bg-white shadow-sm border rounded-full text-blue-600 hover:bg-blue-50"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(s._id)} className="p-2 bg-white shadow-sm border rounded-full text-red-600 hover:bg-red-50"><Trash2 size={14} /></button>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2 pr-12">{s.name}</h3>
                        <div className="text-gray-500 space-y-2">
                            <p className="flex items-center gap-2 text-sm"><Phone size={16} className="text-gray-400" /> {s.contact || 'N/A'}</p>
                            <p className="flex items-center gap-2 text-sm"><Mail size={16} className="text-gray-400" /> {s.email || 'N/A'}</p>
                        </div>
                    </div>
                ))}
                {suppliers.length === 0 && <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">No suppliers found. Add one to get started.</div>}
            </div>
        </div>
    );
};

export default Suppliers;
