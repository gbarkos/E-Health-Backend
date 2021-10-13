const express = require('express');
const departmentController = require('./../controllers/departmentController');
const userController = require('./../controllers/userController');

const router = express.Router();

router
    .route('/')
    .get(userController.protect, departmentController.getDepartments);

// router
//     .route('/:id')
//     .get(userController.protect, departmentController.getSingleDepartment);

module.exports = router;