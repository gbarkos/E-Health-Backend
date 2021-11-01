//Class to handel errors
class AppError extends Error {
    constructor(message, statusCode) {
        //Call super Class constructor
        super(message);

        //AppError class attributes
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.timestump = new Date(Date.now()).toLocaleString("el-GR", {timeZone: "Europe/Athens"});

        Error.captureStackTrace(this, this.constructor);

    };
};

module.exports = AppError;