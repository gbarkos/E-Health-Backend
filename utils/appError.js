//Class to handel errors
class AppError extends Error {
    constructor(message, statusCode) {
        //Call super Class constructor
        super(message);

        //AppError class attributes
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);

    };
};

module.exports = AppError;