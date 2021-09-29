const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'Diagnosis must have a hospital']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Diagnosis must have a user'],
        trim: true,
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Diagnosis must have a doctor']
    },
    description:String
    
});

const Diagnosis = mongoose.model('Prescription',diagnosisSchema);
module.exports =  Diagnosis;