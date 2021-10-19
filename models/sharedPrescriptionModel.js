const mongoose = require('mongoose');

const sharedPrescriptionSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'Share doc must have a hospital id']
    },
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
        required: [true, 'Share doc must have a prescription id']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Share doc must have a user id']
    }
    
});

const SharedPrescription = mongoose.model('SharedPrescription', sharedPrescriptionSchema);
module.exports =  SharedPrescription;