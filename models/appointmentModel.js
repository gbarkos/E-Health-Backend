const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, 'Appointment must have a department']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Appointment must have a user']
    },
    date:{
        type: Date,
        required: [true, 'Appointment must have a user']
    }
});

appointmentSchema.index(
    {department: 1, date: 1},
    {unique: true}
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;