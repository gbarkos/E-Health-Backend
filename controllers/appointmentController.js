const Appointment = require('../models/appointmentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFilters = require('./../utils/apiFilters');

exports.getAppointments = catchAsync (async (req, res, next) => {
    
    const filters = new APIFilters(Appointment.find({user: req.user._id}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const appointments = await filters.query.populate({path:'department', populate:{path:'hospital'}});

    //const appointments = await Appointment.find({user: req.user._id }).populate('hospital').populate('user').populate('department');

    if(!appointments) return next(new AppError("No prescriptions found", 404));
    res.status(200).json({
        status: "success",
        data : {
            appointments
        }
    });
});

exports.getAvailableAppointments = catchAsync(async (req, res, next) => {
    var appointmentList = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30"];
    //var appointmentList = ["06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30"];
    const department = req.query.department;
    let today = new Date(req.query.date);
    today.setHours(03,00,00, 000);
    let tomorrow = new Date(req.query.date);
    tomorrow.setDate(tomorrow.getDate()+1);
    tomorrow.setHours(02,59,59, 999);
    console.log("today"+today);
    console.log("tomorrow"+tomorrow);
    const appointments = await Appointment.find({department: department, date: {$gte: today, $lt: tomorrow}});
    console.log(appointments);

    if(appointments.length != 0) {
        let unavailable = [];
        appointments.forEach(appointment => {
            // let dateObj = new Date(el.date);
            // console.log(dateObj);
            // let formatedDate = dateObj.toISOString().split('T')[1];
            // console.log(formatedDate);
            // let time = formatedDate.split(':');
            // let hour = time[0];
            // let mins = time[1];
            // let filteredDate = hour+":"+mins;
            // console.log(filteredDate);

            let retrievedDate = new Date(appointment.date);
            console.log("retrievedDate:"+retrievedDate);
            let timeslot = String(retrievedDate.getHours()).padStart(2,'0')+":"+String(retrievedDate.getMinutes()).padStart(2,'0');
            console.log(timeslot);
            unavailable.push(timeslot);
        });
        appointmentList = appointmentList.filter(val => !unavailable.includes(val));
    }    
        
    
    
    res.status(200).json({
        status: "success",
        data : {
            appointmentList
        }
    });   
});

exports.getSingleAppointment = catchAsync (async (req, res, next) => {
    const appointment = await Appointment.findOne({_id: req.params.id}).populate({path:'department', populate:{path:'hospital'}});
    if(!appointment) return next(new AppError("Appointment not found", 404));
    res.status(200).json({
        status: "success",
        data : {
            appointment
        }
    });
});

exports.createAppointment = catchAsync (async (req, res, next) => {
    const date = new Date(req.body.date);
    const time = req.body.timeslot.split(':');
    date.setHours(time[0], time[1], 00, 000);
    const department = req.body.department;
    const user = req.user._id;

    const newAppointment = await Appointment.create({
        department: department,
        user: user,
        date: date
    });

    res.status(201).json({
        status : 'success',           
    });
});
