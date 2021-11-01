const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Diagnosis = require('./../models/diagnosisModel');
const helpers = require('./helpers');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFilters = require('./../utils/apiFilters');


exports.getAllDiagnoses = catchAsync( async(req, res, next) => {
    const user = req.user;

    const filters = new APIFilters(Diagnosis.find({user: user._id}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const diagnoses = await filters.query.populate({path: 'department', populate:{path:'hospital'}}).populate('doctor');    

    if(!diagnoses) {
      return next(new AppError('No diagnoses found for this user', 404));
    } else if (diagnoses.length == 0) return next(new AppError('No diagnoses found with these criteria', 404));
  
    res.status(200).json({
      status: 'success',
      results: diagnoses.length,
      data: {
        diagnoses
      }
    });
});

exports.getDiagnosis = catchAsync(async (req, res, next) => {
    const diagnosis = await Diagnosis.findOne({ _id: req.params.id }).populate({path: 'department', populate:{path:'hospital'}}).populate('doctor');

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
  
