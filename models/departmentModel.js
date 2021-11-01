const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Department must have a name'],
        trim: true
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'department must belong to a hospital'],
    }
});

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;