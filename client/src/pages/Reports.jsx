import { useEffect, useState } from 'react';
import api from '../api';
import { DollarSign, ShoppingCart, Package, AlertTriangle, Users, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
    <div className={`${bgColor} p-4 md:p-6 rounded-xl`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xs md:text-sm text-gray-500 mb-1">{label}</p>
                <p className={`text-xl md:text-2xl font-bold ${color}`}>{value}</p>
            </div>
            <div className={`${color} opacity-20`}>
                <Icon size={32} className="md:w-10 md:h-10" />
            </div>
        </div>
    </div>
);

const Reports = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await api.get('/reports');
                setData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="text-gray-500">Loading reports...</div></div>;
    }

    return (
        <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Business Reports</h1>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                <StatCard
                    icon={DollarSign}
                    label="Total Sales Revenue"
                    value={`$${data?.totalSales?.toFixed(2) || '0.00'}`}
                    color="text-green-600"
                    bgColor="bg-green-50"
                />
                <StatCard
                    icon={ShoppingCart}
                    label="Total Transactions"
                    value={data?.transactionCount || 0}
                    color="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Inventory Value"
                    value={`$${data?.inventoryValue?.toFixed(2) || '0.00'}`}
                    color="text-indigo-600"
                    bgColor="bg-indigo-50"
                />
                <StatCard
                    icon={Package}
                    label="Total Items"
                    value={data?.totalItems || 0}
                    color="text-purple-600"
                    bgColor="bg-purple-50"
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Low Stock Alerts"
                    value={data?.lowStockCount || 0}
                    color="text-red-600"
                    bgColor="bg-red-50"
                />
                <StatCard
                    icon={Users}
                    label="Active Suppliers"
                    value={data?.totalSuppliers || 0}
                    color="text-teal-600"
                    bgColor="bg-teal-50"
                />
            </div>
        </div>
    );
};

export default Reports;
