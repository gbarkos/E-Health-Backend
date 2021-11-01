const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Department = require('../models/departmentModel');
const APIFilters = require('./../utils/apiFilters');

exports.getDepartments = catchAsync (async (req, res, next) => {

    const filters = new APIFilters(Department.find({}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const departments = await filters.query.populate('hospital');

    //const departments = await Department.find({hospital: req.query.hospital}).populate('hospital');

    if(!departments) return next(new AppError("No departments found", 404));
    res.status(200).json({
        status: "success",
        data : {
            departments
        }
    });
});