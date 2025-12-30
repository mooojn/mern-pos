import { useState, useEffect } from 'react';
import api from '../api';
import { ShoppingCart } from 'lucide-react';

const Sales = () => {
    const [items, setItems] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [saleData, setSaleData] = useState({ itemId: '', quantity: '' });

    const fetchData = async () => {
        try {
            const [itemsRes, transRes] = await Promise.all([
                api.get('/items'),
                api.get('/transactions')
            ]);
            setItems(itemsRes.data);
            setTransactions(transRes.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSale = async (e) => {
        e.preventDefault();
        const selectedItem = items.find(i => i._id === saleData.itemId);
        if (!selectedItem) return;

        try {
            await api.post('/transactions', {
                ...saleData,
                type: 'sale',
                price: selectedItem.price
            }, { withCredentials: true });

            setSaleData({ itemId: '', quantity: '' });
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Error processing sale');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* New Sale Form */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <ShoppingCart className="text-blue-600" /> New Sale
                    </h2>
                    <form onSubmit={handleSale} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Select Item</label>
                            <select
                                className="w-full border p-2 rounded-lg"
                                value={saleData.itemId}
                                onChange={e => setSaleData({ ...saleData, itemId: e.target.value })}
                                required
                            >
                                <option value="">-- Choose Item --</option>
                                {items.map(item => (
                                    <option key={item._id} value={item._id}>
                                        {item.name} (${item.price}) - {item.quantity} left
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Quantity</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded-lg"
                                value={saleData.quantity}
                                onChange={e => setSaleData({ ...saleData, quantity: e.target.value })}
                                required
                                min="1"
                            />
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Record Sale
                        </button>
                    </form>
                </div>
            </div>

            {/* Transaction History */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <h2 className="p-4 border-b border-gray-100 text-lg font-semibold bg-gray-50">Recent Transactions</h2>
                    <div className="overflow-y-auto max-h-[600px]">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                <tr>
                                    <th className="p-3">Type</th>
                                    <th className="p-3">Item</th>
                                    <th className="p-3">Qty</th>
                                    <th className="p-3 text-right">Total</th>
                                    <th className="p-3 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {transactions.map(t => (
                                    <tr key={t._id}>
                                        <td className="p-3">
                                            <span className={`text-xs px-2 py-1 rounded font-bold ${t.type === 'sale' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {t.type.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-3 font-medium">{t.itemId?.name || 'Unknown'}</td>
                                        <td className="p-3">{t.quantity}</td>
                                        <td className="p-3 text-right font-semibold">${t.totalAmount}</td>
                                        <td className="p-3 text-right text-gray-400 text-sm">
                                            {new Date(t.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {transactions.length === 0 && (
                                    <tr><td colSpan="5" className="p-8 text-center text-gray-500">No transactions recorded</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sales;
