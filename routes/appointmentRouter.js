const express = require('express');
const appointmentController = require('./../controllers/userController');

const router = express.Router();

router
    .route('/')
    .get(userController.protect, appointmentController.getAppointments)
    .post(appointmentController.createAppointment);

router
    .route('/:id')
    .get(userController.protect, userController.getSingleAppointment);

module.exports = router;