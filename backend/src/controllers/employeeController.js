const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: employees.length, data: employees });
    } catch (error) {
        next(error);
    }
};

// @desc    Add new employee
// @route   POST /api/employees
// @access  Public
const addEmployee = async (req, res, next) => {
    try {
        const { employeeId, name, email, department, designation } = req.body;

        // Basic validation
        if (!employeeId || !name || !email || !department || !designation) {
            res.status(400);
            throw new Error('Please fill in all fields');
        }

        // Check for duplicate ID
        const employeeExists = await Employee.findOne({ employeeId });
        if (employeeExists) {
            res.status(400);
            throw new Error('Employee ID already exists');
        }

        // Check for duplicate Email
        const emailExists = await Employee.findOne({ email });
        if (emailExists) {
            res.status(400);
            throw new Error('Email already exists');
        }

        const employee = await Employee.create({
            employeeId,
            name,
            email,
            department,
            designation
        });

        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Public
const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            res.status(404);
            throw new Error('Employee not found');
        }

        await employee.deleteOne();

        res.status(200).json({ success: true, message: `Deleted employee ${employee.name}` });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getEmployees,
    addEmployee,
    deleteEmployee
};
