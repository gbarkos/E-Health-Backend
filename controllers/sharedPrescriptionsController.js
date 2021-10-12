const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const SharedPrescriptions = require('../models/sharedPrescriptionModel');


exports.getMySharedPrescriptions = catchAsync( async (req, res, next) =>{

    sharedPrescriptions = await SharedPrescriptions.find({user: req.user._id}).populate('hospital').populate('prescription');

    if(!sharedPrescriptions) {
        return next(new AppError('User has not share any prescription yet', 404));
    }

    //Send the respond
    res.status(200).json({
        status : 'success',            
        data: {
            sharedPrescriptions
        }
    });
});

exports.shareAPrescription = catchAsync( async (req, res, next) => {

    const newSharedPrescription = await SharedPrescriptions.create({
        hospital: req.body.hospital,
        prescription: req.body.prescription,
        user: req.body.user
    });

    if(!newSharedPrescription) {
        return next(new AppError('Could not save to database', 500));
    }

    //Send the respond
    res.status(201).json({
        status : 'success'
    });

});

exports.getMySelectedSharedPrescription = catchAsync( async (req, res, next) =>{

    sharedPrescription = await SharedPrescriptions.findOne({ user: req.user._id, _id: req.params.id }).populate('hospital').populate('prescription');

    if(!sharedPrescription) {
        return next(new AppError('Share prescription document not found', 404));
    }

    //Send the respond
    res.status(200).json({
        status : 'success',            
        data: {
            sharedPrescription
        }
    });
});