const Attendance = require('../models/Attendance');

// @desc    Mark attendance (Create or Update)
// @route   POST /api/attendance
// @access  Public
const markAttendance = async (req, res, next) => {
    try {
        const { employeeId, date, status } = req.body;

        if (!employeeId || !date || !status) {
            res.status(400);
            throw new Error('Please provide employeeId, date, and status');
        }

        // Upsert: Update if exists, Insert if not
        const attendance = await Attendance.findOneAndUpdate(
            { employee: employeeId, date: date },
            { status: status },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: attendance });
    } catch (error) {
        next(error);
    }
};

// @desc    Get attendance records (optional filter by date)
// @route   GET /api/attendance
// @access  Public
const getAttendance = async (req, res, next) => {
    try {
        const { date } = req.query;
        let query = {};

        if (date) {
            query.date = date;
        }

        const records = await Attendance.find(query).populate('employee', 'name employeeId department');

        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    markAttendance,
    getAttendance
};
