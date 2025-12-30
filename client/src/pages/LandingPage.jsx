import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Package, Users } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                BizKeep
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-indigo-200"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                            Inventory Management <br />
                            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                                Reimagined
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                            BizKeep is the modern way to track sales, manage suppliers, and optimize your inventory.
                            Powerful, intuitive, and designed for growth.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 transform hover:-translate-y-1"
                            >
                                Start for Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md"
                            >
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* Decorative blobs */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full max-w-5xl opacity-30">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                    </div>
                </div>
            </section>

            {/* About / Features Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Everything you need to run your business</h2>
                        <p className="mt-4 text-lg text-slate-600">Simplicity meets power in a single platform.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Package className="h-7 w-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Inventory</h3>
                            <p className="text-slate-600">
                                Track items in real-time. Know exactly what you have, what you need, and when to restock.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <Users className="h-7 w-7 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Supplier Management</h3>
                            <p className="text-slate-600">
                                Keep all your supplier details in one place. Manage orders and relationships effortlessly.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <BarChart3 className="h-7 w-7 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Insightful Reports</h3>
                            <p className="text-slate-600">
                                Visualize your sales data. Understand trends and make data-driven decisions to grow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-800 pb-8 mb-8">
                        <div className="mb-6 md:mb-0">
                            <span className="text-2xl font-bold text-white">BizKeep</span>
                            <p className="mt-2 text-slate-400">Modern inventory management for everyone.</p>
                        </div>
                        <div className="flex gap-6">
                            <Link to="/login" className="text-white hover:text-indigo-400 font-medium">Login</Link>
                            <Link to="/register" className="text-white hover:text-indigo-400 font-medium">Start Now</Link>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                        <p>&copy; {new Date().getFullYear()} BizKeep. All rights reserved.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white">Privacy</a>
                            <a href="#" className="hover:text-white">Terms</a>
                            <a href="#" className="hover:text-white">Twitter</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
