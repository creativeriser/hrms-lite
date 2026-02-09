import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getEmployees = () => api.get('/employees');
export const addEmployee = (data) => api.post('/employees', data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export const getAttendance = (date) => api.get(`/attendance?date=${date}`);
export const markAttendance = (data) => api.post('/attendance', data);

export default api;
