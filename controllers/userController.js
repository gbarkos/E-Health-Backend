//const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const helpers = require('./helpers');
// const signToken = id =>{
//     jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWTEXPIRES_IN
//     })
// };
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
exports.createUser = async (req, res) => {
    try{
        let newBody = {...req.body};
        newBody.bloodtype = helpers.randomBloodType();
        newBody.familyDoctor = await helpers.findaDoctor();
        const newUser = await User.create(newBody);

        //const token = signToken(newUser._id);
        

        res.status(200).json({
            status : 'success',            
            data: {
                user: newUser
            }
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!'
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
    const user = await User.findOne({amka});

    console.log(user);

    if(!user ||  user.correctPassword(password, user.password)!=0){
        return res.status(401).json({msg: "Incorrect amka or password"})
    }

    // const token = signToken(user._id);
    res.status(200).json({
        status: 'success'
    });
};