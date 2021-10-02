const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const helpers = require('./helpers');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWTEXPIRES_IN
    });
};

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(500).json({
        status : 'error',
        message : 'This user is not yet defined'
    })
};

exports.getUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'This user is not yet defined'
    })
};
//Method for user creation
exports.createUser = catchAsync( async (req, res, next) => {
    
        //call for random bloodtype
        const bloodtype = helpers.randomBloodType();
        //call for random family doctor
        const familyDoctor = await helpers.findaDoctor();
        //Seve instance to db and return it to newUser
        const newUser = await User.create({
            amka: req.body.amka,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            bloodtype,
            familyDoctor
        });

        const token = signToken( newUser._id);

        //Call helper to create a random number of diagnosis for the new user
        await helpers.createRandomDiagnosis(newUser._id);
        await helpers.createRandomPrescriptions(newUser._id);

        //remove password fron the output
        newUser.password = undefined;
         
        //Send the respond
        res.status(200).json({
            status : 'success',    
            token,        
            data: {
                user: newUser
            }
        });
    
});

exports.updateUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'This user is not yet defined'
    })
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'This user is not yet defined'
    })
};

exports.login = catchAsync(async (req, res, next) => {
    const { amka, password } = req.body;
    if(!amka || !password){
        return next(new AppError('Please provide amka and password', 400));
    }
    const user = await User.findOne({amka}).select("+password");

    console.log(user);

    if(!user ||  !await(user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect amka or password', 401));
    }

    const token = signToken(user._id);
    res.status(200).json({
        token,
        status: 'success'
    });
});