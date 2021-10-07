const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/appointmentModel');
const helpers = require('./helpers');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAppointments = catchAsync (async (res, req, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        status: "success",
        data : appointments
    });
});

