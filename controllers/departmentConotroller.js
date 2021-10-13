const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Department = require('../models/departmentModel');

exports.getDepartments = catchAsync (async (req, res, next) => {
    const departments = await Department.find({hospital: req.query.hospital});
    if(!departments) return next(new AppError("No departments found", 404));
    res.status(200).json({
        status: "success",
        data : {
            departments
        }
    });
});