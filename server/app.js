//Import the mongoose module
const dotenv=require('dotenv');

const express = require('express');
const app =express();
dotenv.config({path: './config.env'});
require('./db/conn');

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
app.get('/',(req,res)=>{
    res.send("<h1>Hello World of MERN</h1>");
})
app.get('/about',middleware,(req,res)=>{
    res.send("<h1>Hello About me from server</h1>");
})
app.get('/contact',(req,res)=>{
    res.send("<h1>Hello Contact of MERN</h1>");
})
app.get('/login',(req,res)=>{
    res.send("<h1>Hello Login from server</h1>");
})
app.get('/signup',(req,res)=>{
    res.send("<h1>Hello Signup of MERN</h1>");
})
// Listening for requests
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});