import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Welcome to Healthcare Appointment System</h1>
            <p className="text-xl mb-8">Book appointments with top doctors easily.</p>
            <div className="space-x-4">
                <Link to="/login" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">Login</Link>
                <Link to="/register" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">Register</Link>
            </div>
        </div>
    );
};

export default Home;
