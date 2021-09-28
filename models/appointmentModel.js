const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'Appointment must have a hospital']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Appointment must have a user']
    },
    date:{
        type: Date,
        required: [true, 'Appointment must have a user'],
        unique: true
    }

});

const Appointment = new mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;