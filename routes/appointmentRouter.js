const express = require('express');
const appointmentController = require('./../controllers/appointmentController');
const userController = require('../controllers/userController');

const router = express.Router();

router
    .route('/')
    .get(userController.protect, appointmentController.getAppointments)
    .post(userController.protect, appointmentController.createAppointment);

router
    .route('/available')
    .get(userController.protect, appointmentController.getAvailableAppointments);

router
    .route('/:id')
    .get(userController.protect, appointmentController.getSingleAppointment);

module.exports = router;