const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    employeeId: {
        type: String,
        required: [true, 'Please add an Employee ID'],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Please add a Name']
    },
    email: {
        type: String,
        required: [true, 'Please add an Email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    department: {
        type: String,
        required: [true, 'Please add a Department']
    },
    designation: {
        type: String,
        required: [true, 'Please add a Designation']
    },
    joiningDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
