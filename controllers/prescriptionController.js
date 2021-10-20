const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Prescription = require('../models/prescriptionModel');
const APIFilters = require('../utils/apiFilters');

//GET method for Prescriptions 
exports.getMyPrescriptions = catchAsync( async (req, res, next) => {

    const filters = new APIFilters(Prescription.find({user: req.user._id}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const prescriptions = await filters.query.populate('doctor').populate({path: 'department', populate: {path: 'hospital'}});

    if(!prescriptions) {
        return next(new AppError('No prescriptions found for this user', 404));
    } else if (prescriptions.length == 0) return next(new AppError('No prescriptions found with these criteria', 404));

    //Send the respond
    res.status(200).json({
        status : 'success',            
        data: {
            prescriptions
        }
    });
});

exports.getMySelectedPrescription = catchAsync( async (req, res, next) => {

    prescription = await Prescription.findOne({ user: req.user._id, _id: req.params.id }).populate('doctor').populate({path: 'department', populate: {path: 'hospital'}});

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