import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, active, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
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
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        INVENTORY+
                    </h1>
                    <button
                        onClick={closeSidebar}
                        className="lg:hidden p-1 hover:bg-gray-100 rounded"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Overview</p>
                    {!isAdmin && (
                        <>
                            <SidebarItem to="/inventory" icon={Package} label="Inventory" active={location.pathname === '/inventory'} onClick={closeSidebar} />
                            <SidebarItem to="/sales" icon={ShoppingCart} label="Sales" active={location.pathname === '/sales'} onClick={closeSidebar} />
                            <SidebarItem to="/suppliers" icon={Users} label="Suppliers" active={location.pathname === '/suppliers'} onClick={closeSidebar} />
                            <SidebarItem to="/reports" icon={BarChart3} label="Reports" active={location.pathname === '/reports'} onClick={closeSidebar} />
                        </>
                    )}
                    {isAdmin && (
                        <SidebarItem to="/admin" icon={LayoutDashboard} label="Admin Overview" active={location.pathname === '/admin'} onClick={closeSidebar} />
                    )}

                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">Account</p>
                    <SidebarItem to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} onClick={closeSidebar} />
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
            <main className="flex-1 overflow-y-auto bg-slate-50 relative flex flex-col">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        INVENTORY+
                    </h1>
                    <div className="w-10" /> {/* Spacer for centering */}
                </header>

                <div className="absolute inset-0 bg-blue-500 opacity-[0.03] pointer-events-none"></div>
                <div className="p-4 md:p-6 lg:p-8 relative z-0 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
