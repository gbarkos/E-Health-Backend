const Appointment = require('../models/appointmentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Hospital = require('../models/hospitalModel');


exports.getAppointments = catchAsync (async (req, res, next) => {
    const appointments = await Appointment.find({user: req.user._id}).populate('hospital').populate('user');
    if(!appointments) return next(new AppError("No prescriptions found", 404));
    res.status(200).json({
        status: "success",
        data : {
            appointments
        }
    });
});

exports.getSingleAppointment = catchAsync (async (req, res, next) => {
    const appointment = await Appointment.findOne({_id: req.params.id}).populate('hospital').populate('user');
    if(!appointment) return next(new AppError("PAppointment not found", 404));
    res.status(200).json({
        status: "success",
        data : {
            appointment
        }
    });
});

//to be further examined
exports.createAppointment = catchAsync (async (req, res, next) => {
    const datetime = Date.now();
    const hospital = await Hospital.findOne({name : req.body.hospital});
    const user = req.user;

    const newAppointment = await Appointment.create({
        hospital: hospital,
        user: user,
        date: datetime
    });

    res.status(200).json({
        status : 'success',           
        data: {
            newAppointment
        }
    });
});
