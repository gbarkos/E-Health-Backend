//dependencies
const mongoose = require('mongoose');
const app = require('./app');
const seedDB = require('./dev-data/seed');
const dotenv = require('dotenv');

//environment variables config
dotenv.config({path: './config.env'});

//db connection
const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB connection succesfull"));

//seed database
seedDB();

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});