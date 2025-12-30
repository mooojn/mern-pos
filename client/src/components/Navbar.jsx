import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let userRole = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            userRole = decoded.user.role;
        } catch (e) {
            console.error(e);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">HealthCare App</Link>
                <div>
                    {token ? (
                        <>
                            <Link to="/dashboard" className="mr-4 hover:underline">Dashboard</Link>
                            {userRole === 'admin' && (
                                <Link to="/admin" className="mr-4 hover:underline text-yellow-300">Admin Panel</Link>
                            )}
                            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mr-4 hover:underline">Login</Link>
                            <Link to="/register" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
