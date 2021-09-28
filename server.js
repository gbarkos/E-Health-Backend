//dependencies
const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

//environment variables config
dotenv.config({path: './config.env'});

//db connection
const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("DB connection succesfull"));

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});