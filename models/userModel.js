const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    amka:{
        type: String,
        required: [true, 'User must have a AMKA'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'User must have a password'],
        minlength: 8,
        trim: true,
        select: true
    },
    name:{
        type: String,
        required: [true, 'User must have a name'],
        trim: true
    },
    surname:{
        type: String,
        required: [true, 'User must have a surname'],
        trim: true       
    },
    bloodtype:{
        type: String,
        required: [true, 'User must have a bloodtype'],
        trim: true
    },
    email:{
        type:String,
        required: [true, 'User must have a email'],
        trim: true
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error('Email is invalid')
        //     }
        // }
    },
    phoneNumber:{
        type: String,
        required: [true, 'User must have a phone number'],
        minlength: 10,
        maxlength: 10
        // validate: {
        //     validator: function(v) {
        //         return /d{10}/.test(v);
        //     },
        //     message: '{VALUE} is not a valid 10 digit number!'
        // }
    },
    familyDoctor:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
});

userSchema.methods.correctPassword =  function(candidatePassword, userPassword){

    return  candidatePassword.localeCompare(userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;