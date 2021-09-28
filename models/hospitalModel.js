const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Hospital must have a name'],
        trim: true,
        unique: true
    },
    prefecture:{
        type: String,
        required: [true, 'Hospital must have a prefecture']
    },
    departments:{
        type: [String],
        required: [true, 'Hospital must have departments']
    }
});
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
