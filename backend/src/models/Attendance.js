const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: String, // Storing as YYYY-MM-DD string for simple day-wise uniqueness
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true
    }
}, {
    timestamps: true
});

// Prevent duplicate attendance for same employee on same day
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
