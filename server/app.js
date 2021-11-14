//Import the mongoose module
const dotenv=require('dotenv');

const express = require('express');
const app =express();
dotenv.config({path: './config.env'});
require('./db/conn');
// Path to model
// const User=require('./model/userSchema')
// Path to router
app.use(express.json());
app.use(require('./route/auth'))
const PORT=process.env.PORT;
//Get the default connection

// Copy to Clipboard
// Middleware
const middleware=(req,res,next)=>{
    console.log("Hello MERN Middleware");
    next();
}
// path as urls in Django. 
// Here both views and urls are combined are combined

// Listening for requests
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});