const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, 'prescription must have a department']
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
    description:String,
    dispensed:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    
},
{
   toJSON: { virtuals: true },
   toObject: { virtuals: true }
   
});

prescriptionSchema.virtual('active').get( function(){
    const createdDate = new Date(this.createdAt);    
    const expireDate = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate()+30, 23, 59, 59, 999);
    const now = new Date(Date.now());
    if (!this.dispensed && expireDate > now) {
        return true;
    }

    return false;
});


const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports =  Prescription;