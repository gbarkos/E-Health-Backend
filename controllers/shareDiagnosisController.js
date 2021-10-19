const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const SharedDiagnoses = require('../models/sharedDiagnosisModel');

exports.shareDiagnosis= catchAsync( async(req, res, next) => {
    const shareADiagnosis = await SharedDiagnoses.create({
        hospital: req.body.hospital,
        user: req.user,
        diagnosis: req.body.diagnosis
    });

    if(!shareADiagnosis){
        return next(new AppError('Could not share diagnosis', 404));
    }


    res.status(201).json({
        status : 'success'
    });
});

exports.getSharedDiagnoses = catchAsync( async(req, res, next) => {

    const sharedDiagnoses = await SharedDiagnoses.find({user: req.user._id}).populate('hospital').populate('diagnosis');

    if(!sharedDiagnoses) {
        return next(new AppError('No shared-Diagnosis found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        sharedDiagnoses
      }
    });
});

exports.getSelectedSharedDiagnosis= catchAsync( async(req, res, next) => {
    const selectedSharedDiagnosis = await SharedDiagnoses.findOne({_id: req.params.id }).populate('hospital').populate('diagnosis');
   
    if(!selectedSharedDiagnosis) new AppError('No shared-Diagnosis found with that ID', 404);

    res.status(200).json({
        status: 'success',
        data: {
            selectedSharedDiagnosis
        }
      });
});
