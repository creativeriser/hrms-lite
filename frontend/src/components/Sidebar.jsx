import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, ShieldCheck } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Employees', href: '/employees', icon: Users },
        { name: 'Attendance', href: '/attendance', icon: CalendarCheck },
    ];

    return (
        <div className="fixed inset-y-0 left-0 w-72 bg-[#0F172A] text-white shadow-2xl z-50 flex flex-col transition-all duration-300 border-r border-[#1E293B]">
            {/* Logo Section */}
            {/* Logo Section */}
            <div className="flex items-center justify-center h-24 border-b border-[#1E293B]">
                <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-1 ring-white/10">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-white leading-none">HRMS Lite</span>
                        <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase mt-1">Enterprise</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Main Menu</p>
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out relative overflow-hidden ${isActive
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                }`}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                            )}
                            <Icon className={`mr-3 w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110 text-slate-500 group-hover:text-white'}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Mini */}
            <div className="p-4 m-4 rounded-2xl bg-[#1E293B] border border-[#334155]">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-semibold ring-2 ring-[#0F172A]">
                        A
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Administrator</p>
                        <p className="text-xs text-slate-400 truncate">admin@hrms.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
