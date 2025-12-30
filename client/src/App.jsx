import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Suppliers from './pages/Suppliers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return (
      <DashboardLayout onLogout={handleLogout} user={user}>
        {children}
      </DashboardLayout>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!user ? <Login onSuccess={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register onSuccess={setUser} /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<ProtectedRoute><Inventory /></ProtectedRoute>} /> {/* Default to inventory for now */}
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
        <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        {/* Admin Route Placeholder */}
        <Route path="/admin" element={<ProtectedRoute><h1 className="text-2xl font-bold">Admin Overview (Coming Soon)</h1></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
