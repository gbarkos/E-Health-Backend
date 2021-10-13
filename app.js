//Node Module dependencies
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

//Custom dependencies
const userRouter = require('./routes/userRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const prescriptionsRouter = require('./routes/prescriptionsRouter');
const diagnosisRouter = require('./routes/diagnosisRouter');

//app decleration
const app = express();

//middlewares


//Set security HTTP headers
app.use(helmet());

//Development logging
app.use(morgan('dev'));

//Declare limiter options to 100 requests per hour
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: {
        status: "fail",
        message: 'Too many requests, please try again in an hour.'
    }
});

//Use limiter only to the api routes
app.use('/api', limiter);

//Body parser, reading data from body into req.body, not accepting a body with more than 10kb data
app.use(express.json({ limit: '10kb' }));

//Prevent noSQL query injection
app.use(mongoSanitize());

//Keep request timestamp
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
});


//routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/appointments', appointmentRouter);
app.use('/api/v1/prescriptions', prescriptionsRouter);
app.use('/api/v1/diagnosis', diagnosisRouter);
app.use('/api/v1/departments', departmentRouter);
//For all undefined routes throw an error
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

//Error handling middleware  
app.use(globalErrorHandler);

//app export to use in other files
module.exports = app;