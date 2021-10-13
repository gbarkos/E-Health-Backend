
const mongoose = require('mongoose');

const sharedDiagnosisSchema = new mongoose.Schema({
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'Shared Diagnosis must have a hospital']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Shared Diagnosis must have a user']
    },
    diagnosis:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diagnosis',
        required: [true, 'Shared Diagnosis must have a diagnosis']
    },
});

const sharedDiagnosis = mongoose.model('sharedDiagnosis', sharedDiagnosisSchema);
module.exports =  sharedDiagnosis;