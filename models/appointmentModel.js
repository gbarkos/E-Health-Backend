const mongoose = require('mongoose');
const Department = require('./departmentModel');

const appointmentSchema = new mongoose.Schema({
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, 'Appointment must have a department'],
        validate:{
            validator: async function(value){
                const dep = await Department.find({_id: value});

                return  (dep && dep.length > 0);
            },
            message:`Department with this id does not exists`
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Appointment must have a user']
    },
    date:{
        type: Date,
        required: [true, 'Appointment must have a user']
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
    
 });

appointmentSchema.index(
    {department: 1, date: 1},
    {unique: true}
);



appointmentSchema.virtual('active').get( function(){
    const appointmentDate = new Date(this.date);    
    const expireDate = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate(), appointmentDate.getHours(), appointmentDate.getMinutes()+1, 00, 000);
    const now = new Date(Date.now());
    if (expireDate > now) {
        return true;
    }

    return false;
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;