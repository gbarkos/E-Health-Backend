const User = require('./../models/userModel');

exports.getAllUsers = (req, res) => {
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
        req.body.bloodtype = "mybloodtype";
        const newUser = await User.create(req.body);

        res.status(201).json({
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