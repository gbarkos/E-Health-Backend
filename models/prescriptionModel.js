const mongoose = require('mongoose');

const prescriptionSchema = mongoose.Schema({
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'prescription must have a hospital']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'prescription must have a user'],
        trim: true,
    },
    doctor:{
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'prescription must have a doctor']
    },
    medicine:{
        type: String,
        required: [true, 'prescription must have a medicine']
    },
    description:String
    
});

const Prescription = new mongoose.Model('Prescription',prescriptionSchema);
module.exports =  Prescription;