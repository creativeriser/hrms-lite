const express = require('express');
const router = express.Router();
const { getEmployees, addEmployee, deleteEmployee } = require('../controllers/employeeController');

router.route('/').get(getEmployees).post(addEmployee);
router.route('/:id').delete(deleteEmployee);

module.exports = router;
