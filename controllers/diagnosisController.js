const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Diagnosis = require('./../models/diagnosisModel');
const helpers = require('./helpers');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllDiagnoses = catchAsync( async(req, res, next) => {
    const user = req.user;

    diagnoses = await Diagnosis.find({user: user._id}).populate('hospital').populate('user').populate('doctor');

    if(!diagnoses) new AppError('No diagnosis found with that ID', 404);
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: diagnoses.length,
      data: {
        diagnoses
      }
    });
});

exports.getDiagnosis = catchAsync(async (req, res, next) => {
    const diagnosis = await Diagnosis.find({ _id: req.params.id }).populate('hospital').populate('user').populate('doctor');

    if (!diagnosis) {
      return next(new AppError('No diagnosis found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        diagnosis
      }
    });
  });
  
