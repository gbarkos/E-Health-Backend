const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    amka:{
        type: String,
        required: [true, 'User must have a AMKA'],
        unique: true,
        minlength: [11, 'AMKA length has to be 11'],
        maxlength: [11, 'AMKA length has to be 11'],
        validate:{
            validator:function(value){
                var integer = value*1;
                return  !isNaN(integer);
            },
            message:'AMKA must be a string of numbers'
        }
    },
    password:{
        type: String,
        required: [true, 'User must have a password'],
        minlength: [8, 'Password length has to be at least 8'],
        trim: true,
        select: false
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
        trim: true,
        validate: {
            validator:function(value){
                return validator.isEmail(value);
            },
            message:'This is not a correct email'
        }
    },
    phoneNumber:{
        type: String,
        required: [true, 'User must have a phone number'],
        minlength: [10, 'Phone number length has to be 10'],
        maxlength: [10, 'Phone number length has to be 10'],
        validate: {
            validator:function(value){
                var integer = value*1;
                return  !isNaN(integer);
            },
            message:'Phone must be a string of numbers'
        }
    },
    familyDoctor:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){

    return await bcrypt.compare(candidatePassword,userPassword);
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