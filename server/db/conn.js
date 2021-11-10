const mongoose = require('mongoose');
const dotenv=require('dotenv');
const DB=process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology:true}).then(()=>{
        console.log(`connection successful`);
    }).catch((err)=>console.log(`Connection error`));
    // var db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    