const { promisify } = require('util');
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

        if(!newUser) {
            return next(new AppError('Could not save to database', 500));
        }

        const token = signToken( newUser._id);

        //Call helper to create a random number of diagnosis for the new user
        await helpers.createRandomDiagnosis(newUser._id);
        await helpers.createRandomPrescriptions(newUser._id);
        await helpers.createRandomAppointments(newUser._id);
        //remove password fron the output
        newUser.password = undefined;
         
        //Send the respond
        res.status(201).json({
            status : 'success',    
            token
        });
    
});

exports.login = catchAsync(async (req, res, next) => {
    const { amka, password } = req.body;
    if(!amka || !password){
        return next(new AppError('Please provide amka and password', 400));
    }
    const user = await User.findOne({amka}).select("+password");    

    if(!user ||  !await(user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect amka or password', 401));
    }
    
    const token = signToken(user._id);

    console.log({
        token,
        status: 'success'
    });
    res.status(200).json({
        token,
        status: 'success'
    });

});

exports.protect = catchAsync(async(req, res, next) => {
    // 1) getting token and check if it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }


    if(!token){
        return next(new AppError('You are not logged in! Please login to get access.', 401));
    }
    // 2) Verification token    
    const secret = process.env.JWT_SECRET;
    const decoded  = await promisify(jwt.verify)(token, secret);
    console.log(decoded);
    const user = await User.findById(decoded.id).populate('familyDoctor');

    if(!user){
        return next(new AppError('Token does not belong to an existing user! Please login to get access.', 401));
    }
    req.user = user;
    next();
});

exports.getMyProfile = (req, res) => {
    user = req.user;
    if(!user) new AppError('You are not authorized! Please login to get access.', 401);
    res.status(200).json({
            status: 'success',
            data: {
            user
            }
        });
};