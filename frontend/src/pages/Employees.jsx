import React, { useEffect, useState } from 'react';
import { getEmployees, addEmployee, deleteEmployee } from '../services/api';
import Modal from '../components/Modal';
import { Plus, Trash2, Search, Filter } from 'lucide-react';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        email: '',
        department: '',
        designation: ''
    });

    const fetchEmployees = async () => {
        try {
            const res = await getEmployees();
            setEmployees(res.data.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                setEmployees(employees.filter(emp => emp._id !== id));
            } catch (error) {
                alert('Error deleting employee');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEmployee(formData);
            fetchEmployees();
            setIsModalOpen(false);
            setFormData({ employeeId: '', name: '', email: '', department: '', designation: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding employee');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Employees</h2>
                    <p className="text-sm text-slate-500">Manage your team members and their details.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Employee
                </button>
            </div>

            {/* Filters Bar (Visual Only for now) */}
            <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-transparent border-none focus:ring-0 placeholder-slate-400 text-slate-700"
                    />
                </div>
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors">
                    <Filter className="w-4 h-4" />
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            ) : employees.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-dashed border-slate-300">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No employees yet</h3>
                    <p className="text-slate-500 mt-1 mb-6">Get started by adding your first team member.</p>
                    <button onClick={() => setIsModalOpen(true)} className="text-indigo-600 font-medium hover:underline">Add Employee</button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Designation</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100">
                            {employees.map((employee) => (
                                <tr key={employee._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-100 to-indigo-50 flex items-center justify-center text-indigo-700 font-bold border border-indigo-100">
                                                    {employee.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-slate-900">{employee.name}</div>
                                                <div className="text-sm text-slate-500">{employee.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-mono bg-slate-50/30 rounded">{employee.employeeId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700">
                                            {employee.department}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.designation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(employee._id)}
                                            className="text-slate-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                                            title="Delete Employee"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Employee">
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-slate-700">Employee ID</label>
                            <input type="text" name="employeeId" required value={formData.employeeId} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5" placeholder="E001" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-slate-700">Department</label>
                            <input type="text" name="department" required value={formData.department} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5" placeholder="Engineering" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Full Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email Address</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Designation</label>
                        <input type="text" name="designation" required value={formData.designation} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5" placeholder="Senior Developer" />
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-3 bg-indigo-600 text-base font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm transition-colors">
                            Create Profile
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Employees;
