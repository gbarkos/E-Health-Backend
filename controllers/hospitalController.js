const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Hospital = require('./../models/hospitalModel');
const helpers = require('./helpers');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getHospitals = catchAsync( async(req, res, next) => {
    if(req.query.prefecture){
        hospitals = await Hospital.find({prefecture: req.query.prefecture});
    }else{
        hospitals = await Hospital.find();
    }


    
    res.status(200).json({
      status: 'success',
      results: hospitals.length,
      data: {
        hospitals
      }
    });
});
