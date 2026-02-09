import React, { useEffect, useState } from 'react';
import { getEmployees, getAttendance } from '../services/api';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
                {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        presentToday: 0,
        absentToday: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const [empRes, attRes] = await Promise.all([
                    getEmployees(),
                    getAttendance(today)
                ]);

                const totalEmployees = empRes.data.data.length;
                const attendance = attRes.data.data;
                const presentToday = attendance.filter(a => a.status === 'Present').length;
                const absentToday = attendance.filter(a => a.status === 'Absent').length;

                setStats({ totalEmployees, presentToday, absentToday });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Here is what's happening with your workforce today.</p>
                </div>
                <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                    {new Date().toDateString()}
                </div>
            </div>

            {loading ? (
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-32 bg-slate-200 rounded-xl"></div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Employees"
                        value={stats.totalEmployees}
                        icon={Users}
                        color="bg-blue-500"
                        subtext="Active in database"
                    />
                    <StatCard
                        title="Present Today"
                        value={stats.presentToday}
                        icon={UserCheck}
                        color="bg-emerald-500"
                        subtext="Checked in"
                    />
                    <StatCard
                        title="Absent Today"
                        value={stats.absentToday}
                        icon={UserX}
                        color="bg-rose-500"
                        subtext="Not checked in"
                    />
                </div>
            )}

            {/* Placeholder for future Chart or Detailed List */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-lg font-semibold">Efficiency Upgrade</h3>
                    <p className="mt-2 opacity-90 text-sm max-w-lg">
                        Track your team's performance and attendance trends over time.
                        Advanced analytics module coming soon to HRMS Lite.
                    </p>
                    <button className="mt-6 px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
                        Explore Features
                    </button>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default Dashboard;
