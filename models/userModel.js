const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    amka:{
        type: String,
        required: [true, 'User must have a AMKA'],
        unique: true,
        minlength: 11,
        maxlength: 11,
        validate:{
            validator:function(value){
                var integer = value*1;
                console.log(integer);
                return  !isNaN(integer);
            }
        }
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
        minlength: 10,
        maxlength: 10,
        validate: {
            validator:function(value){
                var integer = value*1;
                return  !isNaN(integer);
            }
        }
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