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

        
        //console.log(newUser._id);
        const status = await helpers.createRandomDiagnosis(newUser._id);

        // if(status){
        //     console.log(status);
        // }

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