import { useState, useEffect } from 'react';
import api from '../api';
import { BarChart3 } from 'lucide-react';

const Reports = () => {
    const [stats, setStats] = useState({ totalSales: 0, count: 0 });

    useEffect(() => {
        api.get('/reports')
            .then(res => setStats(res.data));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Business Reports</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg shadow-blue-500/30">
                    <h3 className="text-blue-100 font-medium mb-1">Total Sales Revenue</h3>
                    <p className="text-3xl font-bold">${stats.totalSales.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-gray-500 font-medium mb-1">Total Transactions</h3>
                    <p className="text-3xl font-bold text-gray-800">{stats.count}</p>
                </div>
            </div>

            <div className="mt-8 bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center text-gray-400">
                <BarChart3 className="mx-auto mb-4 opacity-50" size={48} />
                <p>Detailed charts and analytics coming soon...</p>
            </div>
        </div>
    );
};

export default Reports;
