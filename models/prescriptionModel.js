const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'prescription must have a hospital']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'prescription must have a user'],
        trim: true,
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'prescription must have a doctor']
    },
    medicine:{
        type: String,
        required: [true, 'prescription must have a medicine']
    },
    description:String
    
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports =  Prescription;