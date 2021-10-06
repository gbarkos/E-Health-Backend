const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    
  const duplicated = err.keyValue;
  const key = Object.keys(duplicated);
  
  const message = `User with ${key.toString().toUpperCase()}: ${duplicated[key]} already exists!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

module.exports = (err, req, res, next) => {  
  
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    //For operational errors
    if (error.isOperational) {
        //Send response with the error message
        res.status(error.statusCode).json({
            status: error.status,            
            message: error.message
        });
      
        console.error('ERROR 💥', error);
    //If the error is not operational do not send the error data to the user
    } else {
        // 1) Log error
        console.error('ERROR 💥', error);
    
        // 2) Send generic message
        res.status(500).json({
          status: 'error',
          message: 'Something went very wrong!'
        });
      }
  
};