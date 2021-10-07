const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Prescription = require('../models/prescriptionModel');

//GET method for Prescriptions 
exports.getMyPrescriptions = catchAsync( async (req, res, next) => {

    prescriptions = await Prescription.find({user: req.user._id}).populate('doctor', 'name surname').populate('hospital', 'name');

    if(!prescriptions) {
        return next(new AppError('User has no Prescriptions', 404));
    }

    //Send the respond
    res.status(200).json({
        status : 'success',            
        data: {
            prescriptions
        }
    });
});

exports.getMySelectedPrescription = catchAsync( async (req, res, next) => {

    prescription = await Prescription.findOne({ user: req.user._id, _id: req.params.id }).populate('doctor').populate('hospital');

    if(!prescription) {
        return next(new AppError('Prescription not found', 404));
    }

    //Send the respond
    res.status(200).json({
        status : 'success',            
        data: {
            prescription
        }
    });
});