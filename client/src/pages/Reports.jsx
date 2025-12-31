import { useState, useEffect } from 'react';
import api from '../api';
import { BarChart3, TrendingUp, Package, AlertTriangle, Users, DollarSign } from 'lucide-react';

const Reports = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        transactionCount: 0,
        inventoryValue: 0,
        lowStockCount: 0,
        totalItems: 0,
        totalSuppliers: 0
    });

    useEffect(() => {
        api.get('/reports')
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, []);

    const StatCard = ({ title, value, icon: Icon, color, prefix = '' }) => (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}</p>
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Business Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Sales Revenue"
                    value={stats.totalSales}
                    icon={DollarSign}
                    color="bg-green-500 text-green-600"
                    prefix="$"
                />
                <StatCard
                    title="Total Transactions"
                    value={stats.transactionCount}
                    icon={TrendingUp}
                    color="bg-blue-500 text-blue-600"
                />
                <StatCard
                    title="Inventory Value"
                    value={stats.inventoryValue}
                    icon={BarChart3}
                    color="bg-indigo-500 text-indigo-600"
                    prefix="$"
                />
                <StatCard
                    title="Total Items"
                    value={stats.totalItems}
                    icon={Package}
                    color="bg-purple-500 text-purple-600"
                />
                <StatCard
                    title="Low Stock Alerts"
                    value={stats.lowStockCount}
                    icon={AlertTriangle}
                    color="bg-red-500 text-red-600"
                />
                <StatCard
                    title="Active Suppliers"
                    value={stats.totalSuppliers}
                    icon={Users}
                    color="bg-orange-500 text-orange-600"
                />
            </div>
        </div>
    );
};

export default Reports;
