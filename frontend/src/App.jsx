import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';

import Employees from './pages/Employees';
import Attendance from './pages/Attendance';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="attendance" element={<Attendance />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
