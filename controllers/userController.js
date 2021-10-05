const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const helpers = require('./helpers');
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWTEXPIRES_IN
    });
};
exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
            users
            }
        });
    }catch(err){
        res.status(500).json({
            status : 'error',
            message : 'This user is not yet defined'
        })
    }  
    
}
//Method for user creation
exports.createUser = async (req, res) => {
    try{
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
        //Send the respond
        res.status(200).json({
            status : 'success',    
            token,        
            data: {
                user: newUser
            }
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }  
};
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



exports.login = async (req, res, next) => {
    const { amka, password } = req.body;
    if(!amka || !password){
        return res.status(400).json({msg: "Please provide amka and password"})
    }
    const user = await User.findOne({amka}).select("+password");

    console.log(user);

    if(!user ||  !await(user.correctPassword(password, user.password))){
        return res.status(401).json({msg: "Incorrect amka or password"})
    }

    const token = signToken(user._id);
    res.status(200).json({
        token,
        status: 'success'
    });
};

exports.protect = async(req, res, next) => {
    // 1) getting token and check if it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }


    if(!token){
        return next(res.status(401).json({msg: "You are not logged in! Please login to get access."}));
    }
    // 2) Verification token
    try{
        const secret = process.env.JWT_SECRET;
        const decoded  = await promisify(jwt.verify)(token, secret);
        console.log(decoded);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({
            status: 'fail',
            message : 'Ivalid token, please log in again'
        });
    }  
    

};

exports.getMyProfile = async(req, res) => {
    user = req.user;
    res.status(200).json({
            status: 'success',
            data: {
            user
            }
        });
};

