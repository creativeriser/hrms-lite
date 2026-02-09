const express = require('express');
const router = express.Router();
const { getHealth } = require('../controllers/healthController');
const employeeRoutes = require('./employeeRoutes');
const attendanceRoutes = require('./attendanceRoutes');

router.get('/health', getHealth);
router.use('/employees', employeeRoutes);
router.use('/attendance', attendanceRoutes);

module.exports = router;
