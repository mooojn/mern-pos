import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut } from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${active
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </Link>
);

const DashboardLayout = ({ children, onLogout, user }) => {
    const location = useLocation();
    const isAdmin = user?.role === 'admin';

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        INVENTORY+
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Overview</p>
                    {!isAdmin && (
                        <>
                            <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/dashboard'} />
                            <SidebarItem to="/inventory" icon={Package} label="Inventory" active={location.pathname === '/inventory'} />
                            <SidebarItem to="/sales" icon={ShoppingCart} label="Sales" active={location.pathname === '/sales'} />
                            <SidebarItem to="/suppliers" icon={Users} label="Suppliers" active={location.pathname === '/suppliers'} />
                            <SidebarItem to="/reports" icon={BarChart3} label="Reports" active={location.pathname === '/reports'} />
                        </>
                    )}
                    {isAdmin && (
                        <SidebarItem to="/admin" icon={LayoutDashboard} label="Admin Overview" active={location.pathname === '/admin'} />
                    )}

                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">Account</p>
                    <SidebarItem to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div>
                            <p className="text-sm font-semibold text-gray-700">{user?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-slate-50 relative">
                <div className="absolute inset-0 bg-blue-500 opacity-[0.03] pointer-events-none"></div> {/* Subtle tint */}
                <div className="p-8 relative z-0">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
