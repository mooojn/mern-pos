import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Package, Users, ShieldCheck, Zap, Globe, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">

            {/* Navigation */}
            <nav className="fixed w-full bg-white/70 backdrop-blur-xl z-50 border-b border-white/20 supports-[backdrop-filter]:bg-white/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
                                B
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                BizKeep
                            </span>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-5 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
                {/* Background Mesh Gradients */}
                <div className="absolute top-0 right-0 -z-10 w-[50%] h-[50%] bg-gradient-to-b from-blue-50 to-white opacity-60 blur-3xl rounded-full translate-x-1/2 -translate-y-1/4"></div>
                <div className="absolute top-40 left-0 -z-10 w-[40%] h-[40%] bg-gradient-to-r from-indigo-50 to-white opacity-60 blur-3xl rounded-full -translate-x-1/3"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                        {/* Left Column: Content */}
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                v2.0 Now Available
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-slate-900 mb-8 leading-[1.1]">
                                Inventory, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Synchronized.
                                </span>
                            </h1>
                            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg">
                                The modern operating system for your business. Manage stock, track sales, and forecast growth with a beautiful, intuitive interface.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/register"
                                    className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 text-base font-medium text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700 hover:-translate-y-1"
                                >
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                                <Link
                                    to="/login"
                                    className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-8 text-base font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300"
                                >
                                    View Demo
                                </Link>
                            </div>

                            <div className="mt-12 flex items-center gap-4 text-sm text-slate-400">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                                    ))}
                                </div>
                                <p>Trusted by 500+ businesses</p>
                            </div>
                        </div>

                        {/* Right Column: 3D Visual */}
                        <div className="relative perspective-1000 group">
                            {/* Main Dashboard Card */}
                            <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-2 transform transition-transform duration-700 ease-out group-hover:rotate-y-[-2deg] group-hover:rotate-x-[2deg] rotate-y-[-6deg] rotate-x-[4deg]">
                                {/* Top Bar */}
                                <div className="h-10 border-b border-slate-100 flex items-center px-4 gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <div className="ml-4 h-2 w-32 bg-slate-100 rounded-full"></div>
                                </div>

                                {/* Mock Content */}
                                <div className="p-6 grid grid-cols-12 gap-6 bg-slate-50/50 h-[400px]">
                                    {/* Sidebar */}
                                    <div className="col-span-3 hidden md:flex flex-col gap-3 pr-4 border-r border-slate-100">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="h-8 w-full bg-white rounded-md shadow-sm border border-slate-100/50"></div>
                                        ))}
                                    </div>

                                    {/* Main Content */}
                                    <div className="col-span-12 md:col-span-9 flex flex-col gap-6">
                                        {/* Stats Row */}
                                        <div className="grid grid-cols-3 gap-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-24 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center p-4 gap-3">
                                                    <div className="h-2 w-8 bg-blue-100 rounded-full"></div>
                                                    <div className="h-6 w-16 bg-slate-100 rounded-md"></div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Chart Area */}
                                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4 relative overflow-hidden">
                                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-50/50 to-transparent"></div>
                                            <div className="flex items-end justify-between h-full gap-2 px-2 pb-2">
                                                {[40, 60, 45, 70, 50, 80, 65, 85].map((h, i) => (
                                                    <div key={i} style={{ height: `${h}%` }} className="w-full bg-blue-500/10 rounded-t-sm hover:bg-blue-500/20 transition-colors"></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Element 1 - Notification */}
                            <div className="absolute -right-8 top-12 z-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-float">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400 font-medium">System Alert</div>
                                        <div className="text-sm font-bold text-slate-800">Stock Updated</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Element 2 - User */}
                            <div className="absolute -left-12 bottom-20 z-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-float animation-delay-2000 hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400 font-medium">New Customer</div>
                                        <div className="text-sm font-bold text-slate-800">+24% Growth</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white relative border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                            Powerful features, <br /> zero clutter.
                        </h2>
                        <p className="text-lg text-slate-500">
                            We stripped away the complexity and left only the tools you need to run your business efficiently.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Package, title: "Smart Inventory", desc: "Real-time tracking with low-stock alerts." },
                            { icon: BarChart3, title: "Analytics", desc: "Visual reports that help you sell more." },
                            { icon: Users, title: "Suppliers", desc: "Manage vendor relationships in one place." },
                            { icon: ShieldCheck, title: "Secure Data", desc: "Enterprise-grade security for your data." }
                        ].map((feature, i) => (
                            <div key={i} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-900 mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modern CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 opacity-50"></div>
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
                        Ready to upgrade your workflow?
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        Join thousands of businesses that trust BizKeep to manage their inventory and sales.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors">
                            Get Started Now
                        </Link>
                        <Link to="/contact" className="px-8 py-4 bg-transparent border border-slate-700 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-colors">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="bg-white border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white text-xs font-bold">B</div>
                        <span className="font-bold text-slate-900">BizKeep</span>
                    </div>
                    <div className="flex gap-8 text-sm text-slate-500 font-medium">
                        <a href="#" className="hover:text-slate-900">Product</a>
                        <a href="#" className="hover:text-slate-900">Pricing</a>
                        <a href="#" className="hover:text-slate-900">Company</a>
                        <a href="#" className="hover:text-slate-900">Legal</a>
                    </div>
                    <div className="text-slate-400 text-sm">
                        © 2024 BizKeep Inc.
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
