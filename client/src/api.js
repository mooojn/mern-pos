import axios from 'axios';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const API_URL = isLocal
    ? 'http://localhost:5000/api'
    : 'https://bizkeep-server.vercel.app/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default api;
