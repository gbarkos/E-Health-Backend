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
    }
});
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
