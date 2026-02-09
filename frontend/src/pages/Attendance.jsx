import React, { useEffect, useState, useRef } from 'react';
import { getEmployees, getAttendance, markAttendance } from '../services/api';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const dateInputRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, [selectedDate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [empRes, attRes] = await Promise.all([
                getEmployees(),
                getAttendance(selectedDate)
            ]);

            setEmployees(empRes.data.data);

            // Map attendance records
            const attMap = {};
            attRes.data.data.forEach(record => {
                attMap[record.employee._id] = record.status;
            });
            setAttendanceRecords(attMap);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAttendance = async (employeeId, status) => {
        try {
            await markAttendance({
                employeeId,
                date: selectedDate,
                status
            });

            setAttendanceRecords(prev => ({
                ...prev,
                [employeeId]: status
            }));
        } catch (error) {
            alert('Error updating attendance');
        }
    };

    const adjustDate = (days) => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + days);
        setSelectedDate(date.toISOString().split('T')[0]);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Attendance Tracker</h2>
                    <p className="text-slate-500 text-sm">Mark and view daily attendance for your team.</p>
                </div>

                <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                    <button
                        onClick={() => adjustDate(-1)}
                        className="p-2 hover:bg-white hover:text-indigo-600 hover:shadow-sm rounded-lg transition-all text-slate-400"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div
                        className="relative flex items-center space-x-3 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 cursor-pointer hover:border-indigo-200 group transition-colors"
                        onClick={() => dateInputRef.current?.showPicker()}
                    >
                        <CalendarIcon className="w-4 h-4 text-indigo-500 group-hover:text-indigo-600" />
                        <span className="text-sm font-semibold text-slate-700 min-w-[90px] text-center">
                            {new Date(selectedDate).toLocaleDateString(undefined, {
                                month: 'short', day: 'numeric', year: 'numeric'
                            })}
                        </span>
                        {/* Hidden Input that gets triggered */}
                        <input
                            ref={dateInputRef}
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer -z-10"
                        />
                    </div>

                    <button
                        onClick={() => adjustDate(1)}
                        className="p-2 hover:bg-white hover:text-indigo-600 hover:shadow-sm rounded-lg transition-all text-slate-400"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            ) : employees.length === 0 ? (
                <div className="bg-white p-6 rounded shadow text-center text-gray-500">
                    No employees found. Add employees first.
                </div>
            ) : (
                <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50/80">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100">
                            {employees.map((employee) => {
                                const status = attendanceRecords[employee._id];
                                return (
                                    <tr key={employee._id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-semibold mr-3">
                                                    {employee.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">{employee.name}</div>
                                                    <div className="text-xs text-slate-500">{employee.designation}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{employee.employeeId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center space-x-3">
                                                <button
                                                    onClick={() => handleMarkAttendance(employee._id, 'Present')}
                                                    className={`group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${status === 'Present'
                                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-500 ring-offset-2'
                                                            : 'bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                                                        }`}
                                                >
                                                    <CheckCircle className={`w-4 h-4 mr-2 ${status === 'Present' ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500'}`} />
                                                    Present
                                                </button>
                                                <button
                                                    onClick={() => handleMarkAttendance(employee._id, 'Absent')}
                                                    className={`group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${status === 'Absent'
                                                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-500 ring-offset-2'
                                                            : 'bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600'
                                                        }`}
                                                >
                                                    <XCircle className={`w-4 h-4 mr-2 ${status === 'Absent' ? 'text-white' : 'text-slate-400 group-hover:text-rose-500'}`} />
                                                    Absent
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Attendance;
