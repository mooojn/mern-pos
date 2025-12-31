import { useState, useEffect } from 'react';
import api from '../api';
import { Building2, Package, ShoppingCart, Users, Trash2, Edit2, Plus, X } from 'lucide-react';

const AdminPanel = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingBusiness, setEditingBusiness] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        contactEmail: '',
        phone: '',
        address: ''
    });

    const fetchBusinesses = async () => {
        try {
            const res = await api.get('/admin/businesses');
            setBusinesses(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinesses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBusiness) {
                await api.put(`/admin/businesses/${editingBusiness._id}`, formData);
            } else {
                if (!formData.password) {
                    alert('Password is required for new business');
                    return;
                }
                await api.post('/admin/businesses', formData);
            }
            closeForm();
            fetchBusinesses();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving business');
        }
    };

    const handleEdit = (business) => {
        setEditingBusiness(business);
        setFormData({
            name: business.name || '',
            password: '',
            contactEmail: business.contactEmail || '',
            phone: business.phone || '',
            address: business.address || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Are you sure you want to delete "${name}" and ALL their data? This cannot be undone.`)) return;
        try {
            await api.delete(`/admin/businesses/${id}`);
            fetchBusinesses();
        } catch (err) {
            alert('Error deleting business');
        }
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingBusiness(null);
        setFormData({ name: '', password: '', contactEmail: '', phone: '', address: '' });
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="text-gray-500">Loading...</div></div>;
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Panel</h1>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold text-center">
                        {businesses.length} Registered
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                        <Plus size={18} /> Add Business
                    </button>
                </div>
            </div>

            {/* Add/Edit Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl border border-gray-100 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg md:text-xl font-bold">{editingBusiness ? 'Edit Business' : 'Add New Business'}</h2>
                            <button onClick={closeForm} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Business Name *</label>
                                <input
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Password {editingBusiness ? '(leave blank to keep current)' : '*'}
                                </label>
                                <input
                                    type="password"
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    required={!editingBusiness}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact Email</label>
                                <input
                                    type="email"
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.contactEmail}
                                    onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <input
                                    className="w-full border p-2 rounded-lg"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                                <button type="button" onClick={closeForm} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg order-2 sm:order-1">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 order-1 sm:order-2">
                                    {editingBusiness ? 'Update' : 'Create Business'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {businesses.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center text-gray-500 border border-dashed border-gray-200">
                    <Building2 className="mx-auto mb-4 opacity-50" size={48} />
                    <p>No businesses registered yet.</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        Add your first business
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {businesses.map(business => (
                        <div key={business._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
                            <div className="p-4 md:p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg font-bold text-gray-800 truncate">{business.name}</h3>
                                        <p className="text-sm text-gray-500 truncate">{business.contactEmail || 'No email'}</p>
                                        {business.phone && <p className="text-sm text-gray-400">{business.phone}</p>}
                                    </div>
                                    <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-2">
                                        <button
                                            onClick={() => handleEdit(business)}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                                            title="Edit Business"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(business._id, business.name)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            title="Delete Business"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 md:gap-3">
                                    <div className="bg-blue-50 p-2 md:p-3 rounded-lg text-center">
                                        <Package size={16} className="mx-auto text-blue-600 mb-1" />
                                        <p className="text-base md:text-lg font-bold text-blue-900">{business.stats.items}</p>
                                        <p className="text-xs text-blue-600">Items</p>
                                    </div>
                                    <div className="bg-green-50 p-2 md:p-3 rounded-lg text-center">
                                        <ShoppingCart size={16} className="mx-auto text-green-600 mb-1" />
                                        <p className="text-base md:text-lg font-bold text-green-900">{business.stats.transactions}</p>
                                        <p className="text-xs text-green-600">Sales</p>
                                    </div>
                                    <div className="bg-purple-50 p-2 md:p-3 rounded-lg text-center">
                                        <Users size={16} className="mx-auto text-purple-600 mb-1" />
                                        <p className="text-base md:text-lg font-bold text-purple-900">{business.stats.suppliers}</p>
                                        <p className="text-xs text-purple-600">Suppliers</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 md:px-6 py-3 border-t border-gray-100 flex flex-wrap justify-between items-center gap-2">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${business.isProfileComplete ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {business.isProfileComplete ? 'Complete' : 'Incomplete'}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(business.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
