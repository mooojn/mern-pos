import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/appointments', {
                headers: { 'x-auth-token': token }
            });
            setAppointments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDoctors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/doctors');
            setDoctors(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAppointments();
        fetchDoctors();
    }, []);

    const handleBook = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/appointments',
                { doctorId: selectedDoctor, date },
                { headers: { 'x-auth-token': token } }
            );
            setMessage('Appointment booked successfully!');
            fetchAppointments();
        } catch (err) {
            setMessage('Error booking appointment');
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

            {/* Booking Section */}
            <div className="bg-white p-6 rounded shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
                {message && <p className="mb-4 text-blue-600">{message}</p>}
                <form onSubmit={handleBook} className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block mb-2">Select Doctor</label>
                        <select className="w-full border p-2 rounded" value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)} required>
                            <option value="">-- Select Doctor --</option>
                            {doctors.map(doc => (
                                <option key={doc._id} value={doc._id}>{doc.name} - {doc.specialization}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2">Date</label>
                        <input type="date" className="w-full border p-2 rounded" value={date} onChange={e => setDate(e.target.value)} required />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Book Now</button>
                </form>
            </div>

            {/* Appointments List */}
            <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
            <div className="grid gap-4">
                {appointments.map(appt => (
                    <div key={appt._id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                        <h3 className="font-bold text-lg">Dr. {appt.doctorId?.name}</h3>
                        <p className="text-gray-600">{appt.doctorId?.specialization}</p>
                        <p className="text-gray-500">Date: {new Date(appt.date).toLocaleDateString()}</p>
                        <p className={`mt-2 font-semibold ${appt.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                            Status: {appt.status.toUpperCase()}
                        </p>
                    </div>
                ))}
                {appointments.length === 0 && <p>No appointments found.</p>}
            </div>
        </div>
    );
};

export default Dashboard;
