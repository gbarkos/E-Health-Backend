const Appointment = require('../models/appointmentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAppointments = catchAsync (async (res, req, next) => {
    const appointments = await Appointment.find().populate('hospital').populate('user');
    if(!appointments) return next(new AppError("No prescriptions found", 404));
    res.status(200).json({
        status: "success",
        data : {
            appointments
        }
    });
});

exports.getSingleAppointment = catchAsync (async (res, req, next) => {
    const appointment = await Appointment.find(req.user_id).populate('hospital').populate('user');
    if(!appointment) return next(new AppError("Prescription not found", 404));
    res.status(200).json({
        status: "success",
        data : {
            appointment
        }
    });
});


exports.createAppointment = catchAsync (async (res, req, next) => {
    const newAppointment = await Appointment.create({
        hospital: req.body.hospital,
        user: req.body.user,
        date: req.body.date
    });

    res.status(200).json({
        status : 'success',           
        data: {
            newAppointment
        }
    });
});
