const mongoose = require('mongoose');
const Diagnosis = require('./diagnosisModel');
const Hospital = require('./hospitalModel');

const sharedDiagnosisSchema = new mongoose.Schema({
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'Shared Diagnosis must have a hospital'],
        validate:{
            validator: async function(value){
                const hosp = await Hospital.find({_id: value});

                return  (hosp && hosp.length > 0);
            },
            message:`Hospital with this id does not exists`
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Shared Diagnosis must have a user']
    },
    diagnosis:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diagnosis',
        required: [true, 'Shared Diagnosis must have a diagnosis'],
        validate:{
            validator: async function(value){
                const diag = await Diagnosis.find({_id: value});

                return  (diag && diag.length > 0);
            },
            message:`Diagnosis with this id does not exists`
        }
    },
});

sharedDiagnosisSchema.index(
    {diagnosis: 1, hospital: 1},
    {unique: true}
);

const sharedDiagnosis = mongoose.model('sharedDiagnosis', sharedDiagnosisSchema);
module.exports =  sharedDiagnosis;