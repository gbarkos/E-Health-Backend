const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Hospital = require('./../models/hospitalModel');
const helpers = require('./helpers');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFilters = require('./../utils/apiFilters');


exports.getHospitals = catchAsync( async(req, res, next) => {
  
  const filters = new APIFilters(Hospital.find({}), req.query)
  .filter()
  .sort()
  .limitFields()
  .paginate();

  const hospitals = await filters.query;
    
  res.status(200).json({
    status: 'success',
    results: hospitals.length,
    data: {
      hospitals
    }
  });
});
