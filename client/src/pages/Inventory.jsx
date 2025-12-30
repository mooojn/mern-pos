import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });
    const [search, setSearch] = useState('');

    const fetchItems = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/items', { withCredentials: true });
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/items', formData, { withCredentials: true });
            setShowForm(false);
            setFormData({ name: '', price: '', quantity: '' });
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            await axios.delete(`http://localhost:5000/api/items/${id}`, { withCredentials: true });
            fetchItems();
        }
    };

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <Plus size={18} /> Add Item
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 animate-in slide-in-from-top-4">
                    <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            placeholder="Item Name"
                            className="border p-2 rounded"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Price"
                            type="number"
                            className="border p-2 rounded"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Quantity"
                            type="number"
                            className="border p-2 rounded"
                            value={formData.quantity}
                            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                        />
                        <div className="md:col-span-3 flex justify-end gap-2">
                            <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:bg-gray-100 px-4 py-2 rounded">Cancel</button>
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            placeholder="Search items..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-sm">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredItems.map(item => (
                            <tr key={item._id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-medium">{item.name}</td>
                                <td className="p-4">${item.price}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${item.quantity < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {item.quantity} units
                                    </span>
                                </td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {filteredItems.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">No items found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
