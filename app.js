//Node Module dependencies
const express = require('express');
const morgan = require('morgan');

//Custom dependencies
const userRouter = require('./routes/userRouter');

//app decleration
const app = express();

//middlewares
app.use(morgan('dev'));//logging tool
app.use(express.json()); //middleware


//routes
app.use('/api/v1/users', userRouter);

//app export to use in other files
module.exports = app;