const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const SharedPrescriptions = require('../models/sharedPrescriptionModel');
const APIFilters = require('./../utils/apiFilters');


exports.getMySharedPrescriptions = catchAsync( async (req, res, next) =>{

    const filters = new APIFilters(SharedPrescriptions.find({user: req.user._id}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const sharedPrescriptions = await filters.query.populate('hospital').populate('prescription');

    if(!sharedPrescriptions) {
        return next(new AppError('No shared prescriptions found for this user', 404));
    } else if (sharedPrescriptions.length == 0) return next(new AppError('No shared prescriptions found with these criteria', 404));

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