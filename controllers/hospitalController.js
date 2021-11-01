const Hospital = require('./../models/hospitalModel');
const SharedPrescription =require('./../models/sharedPrescriptionModel');
const SharedDiagnosis =require('./../models/sharedDiagnosisModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFilters = require('./../utils/apiFilters');
const { promisify } = require('util');

exports.getHospitals = catchAsync( async(req, res, next) => {

 
  const filters = new APIFilters(Hospital.find({}), req.query)
  .filter()
  .sort()
  .limitFields()
  .paginate();

  let hospitals = await filters.query;
  
  if(req.query.presc) {
    
    let shared=[];
   for(let hospital1 in hospitals) {
     const curHospital = hospitals[hospital1];
      const curShared = await SharedPrescription.find({hospital: curHospital._id , prescription: req.query.presc});
     
      if(curShared.length >0) shared.push(curShared[0].hospital.toString().trim());
   }
   
   hospitals = hospitals.filter(element => shared.includes(element._id.toString().trim()));      
    
  } else if (req.query.diag) {
    
  let shared=[];
   for(let hospital1 in hospitals) {
     const curHospital = hospitals[hospital1];
      const curShared = await SharedDiagnosis.find({hospital: curHospital._id , diagnosis: req.query.diag});
     
      if(curShared.length >0) shared.push(curShared[0].hospital.toString().trim());
   }
   
   hospitals = hospitals.filter(element => shared.includes(element._id.toString().trim()));      
    
  }

  if(hospitals.length == 0) return next(new AppError('There are no hospitals with these criteria', 404));
  
    
  res.status(200).json({
    status: 'success',
    results: hospitals.length,
    data: {
      hospitals
    }
  });
});
