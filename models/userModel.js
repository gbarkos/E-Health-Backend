const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

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
    confirmPassword:{
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(confirmValue) {
                return confirmValue === this.password;
            },
            message: 'Passwords are not the same!'
        }
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
//Changes before save
userSchema.pre('save', async function (next) {
    //if there is not any change at the password field call next
    if (!this.isModified('password')) return next();
    //hash password field
    this.password = await bcrypt.hash(this.password, 12);
    //do not save to db the confirmPassword field
    this.confirmPassword = undefined;
});
const User = mongoose.model('User', userSchema);

module.exports = User;