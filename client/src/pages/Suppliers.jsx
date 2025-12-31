import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit2, Trash2, X, Users } from 'lucide-react';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
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
        try {
            if (editingId) {
                await api.put(`/suppliers/${editingId}`, formData);
            } else {
                await api.post('/suppliers', formData);
            }
            closeForm();
            fetchSuppliers();
        } catch (err) { console.error(err); }
    };

    const handleEdit = (supplier) => {
        setEditingId(supplier._id);
        setFormData({ name: supplier.name, contact: supplier.contact || '', email: supplier.email || '' });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this supplier?')) return;
        await api.delete(`/suppliers/${id}`);
        fetchSuppliers();
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: '', contact: '', email: '' });
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Suppliers</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 w-full sm:w-auto justify-center"
                >
                    <Plus size={18} /> Add Supplier
                </button>
            </div>

            {/* Add/Edit Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{editingId ? 'Edit Supplier' : 'Add Supplier'}</h2>
                            <button onClick={closeForm} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.contact}
                                    onChange={e => setFormData({ ...formData, contact: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                                <button type="button" onClick={closeForm} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg order-2 sm:order-1">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 order-1 sm:order-2">
                                    {editingId ? 'Update' : 'Add Supplier'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {suppliers.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center text-gray-500 border border-dashed border-gray-200">
                    <Users className="mx-auto mb-4 opacity-50" size={48} />
                    <p>No suppliers yet. Add your first supplier!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suppliers.map(s => (
                        <div key={s._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition group">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-800">{s.name}</h3>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(s)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={14} /></button>
                                    <button onClick={() => handleDelete(s._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">{s.contact || 'No phone'}</p>
                            <p className="text-sm text-gray-400 truncate">{s.email || 'No email'}</p>

                            {/* Mobile Action Buttons - Always visible */}
                            <div className="flex gap-2 mt-3 sm:hidden">
                                <button onClick={() => handleEdit(s)} className="flex-1 text-sm py-1.5 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">Edit</button>
                                <button onClick={() => handleDelete(s._id)} className="flex-1 text-sm py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Suppliers;
