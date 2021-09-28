const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'Diagnosis must have a hospital']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Diagnosis must have a user'],
        trim: true,
    },
    doctor:{
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Diagnosis must have a doctor']
    },
    description:String
    
});

const Diagnosis = new mongoose.Model('Prescription',diagnosisSchema);
module.exports =  Diagnosis;