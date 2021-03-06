const { getDefaultDirectives } = require('helmet/dist/middlewares/content-security-policy');
const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, 'Diagnosis must have a department']
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
    createdAt: {
        type: Date,
        default: Date.now()
    }, 
    description:String
    
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);
module.exports =  Diagnosis;