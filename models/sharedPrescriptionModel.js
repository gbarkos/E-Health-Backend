const mongoose = require('mongoose');
const Hospital = require('./hospitalModel');
const Prescription = require('./prescriptionModel');

const sharedPrescriptionSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'Share doc must have a hospital id'],
        validate:{
            validator: async function(value){
                const hosp = await Hospital.find({_id: value});

                return  (hosp && hosp.length > 0);
            },
            message:`Hospital with this id does not exists`
        }
    },
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
        required: [true, 'Share doc must have a prescription id'],
        validate:{
            validator: async function(value){
                const presc = await Prescription.find({_id: value});

                return  (presc && presc.length > 0);
            },
            message:`Hospital with this id does not exists`
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Share doc must have a user id']
    }
    
});

sharedPrescriptionSchema.index(
    {prescription: 1, hospital: 1},
    {unique: true}
);

const SharedPrescription = mongoose.model('SharedPrescription', sharedPrescriptionSchema);
module.exports =  SharedPrescription;