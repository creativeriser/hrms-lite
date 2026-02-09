import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Overview</h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Welcome back, Admin</p>
                </div>
                <div className="flex items-center space-x-6">
                    <button className="relative p-2.5 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 group">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-2.5 right-2.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
                    </button>
                    <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-slate-700">Admin User</p>
                            <p className="text-xs text-slate-400">Super Admin</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 ring-2 ring-white cursor-pointer hover:ring-indigo-100 transition-all">
                            A
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
