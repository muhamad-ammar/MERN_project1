const express = require('express');
const router = express.Router();
const jwt =require(`jsonwebtoken`);
const bcrypt=require(`bcryptjs`);
require('../db/conn');
const User=require('../model/userSchema');
router.get('/',(req,res)=>{
    res.send("<h1>Hello World of MERN</h1>");
})
// router.get('/about',middleware,(req,res)=>{
//     res.send("<h1>Hello About me from server</h1>");
// })
router.get('/contact',(req,res)=>{
    res.send("<h1>Hello Contact of MERN</h1>");
})
// router.get('/login',(req,res)=>{
//     res.send("<h1>Hello Login from server</h1>");
// })
// Using async
router.post('/signup',async (req,res)=>{
    // console.log(req.body);
    // res.json({message:req.body});  
    // res.send(req.body);
    const {name, email,username, password1, password2}=req.body;
    // console.log(name);
    // console.log(email);
    // Check if empty
    if(!name|| !email|| !password1|| !password2 || !username)
    {
        return res.status(422).json({error: "Missing something"});
    }
    try{
       const userExist =await User.findOne({username:username})
    
        if(userExist)
        {
            return res.status(422).json({error:"Username already exist"});
        }
        const user =new User({name, email,username, password1, password2});
        if(password1==password2)
        {
            const userReg=await user.save();
            if(userReg)
            {
                res.status(201).json({message: "User registered successfuly"});
            }       
            else
            {
                res.status(500).json({error:"Failed to register"})
            }
        }
        else
        {
            res.status(500).json({error:"Failed to register. Password Mistmatch"});
        }
        
    }catch(err){
        console.log(err);
    }
});
//login route
router.post('/login',async (req,res)=>{
    // console.log(req.body);
    // res.json({message:req.body});  
    // res.send(req.body);
    const {username, password1}=req.body;
    // console.log(name);
    // console.log(email);
    // Check if empty
    if(!username|| !password1)
    {
        return res.status(422).json({error: "Missing something"});
    }
    try{
       const userExist =await User.findOne({username:username});
    //    const passExist =await User.findOne({password1:password1});
    if(!userExist)
    {
        return res.status(404).json({error:"User not found"});
    }
    else
    {
        const isMatch = await bcrypt.compare(password1,userExist.password1);
        //jwt
        const token = await userExist.generateAuthToken();
        // Store in cookie
        res.cookie("jwtoken",token,{
            expires: new Date(Date.now()+6.04800000000),
            httpOnly:true
        });
        if(!isMatch)
        {
            return res.status(422).json({error:"Invalid Login"});
        }
        else
        {
            console.log(isMatch);
            const name= userExist.name;
            return res.status(201).json({message:"Welcome "+name});
            
        }
    }

    
        // const user =new User({name, email,username, password1, password2});
        // if(password1==password2)
        // {
            // const userReg=await user.save();
            // if(userReg)
            // {
            //     res.status(201).json({message: "User registered successfuly"});
            // }       
            // else
            // {
            //     res.status(500).json({error:"Failed to register"})
            // }
        // }
        // else
        // {
        //     res.status(500).json({error:"Failed to register. Password Mistmatch"});
        // }
        
    }catch(err){
        console.log(err);
    }
});

//promises
// router.post('/signup',(req,res)=>{
//     // console.log(req.body);
//     // res.json({message:req.body});  
//     // res.send(req.body);
//     const {name, email,username, password1, password2}=req.body;
//     // console.log(name);
//     // console.log(email);
//     // Check if empty
//     if(!name|| !email|| !password1|| !password2 || !username)
//     {
//         return res.status(422).json({error: "Missing something"});
//     }
//     User.findOne({username:username})
//     .then((userExist)=>{
//         if(userExist)
//         {
//             return res.status(422).json({error:"Username already exist"});
//         }
//         const user =new User({name, email,username, password1, password2});

//         user.save().then(()=>{
//             res.status(201).json({message: "User registered successfuly"});
//         }).catch((err)=>res.status(500).json({error:"Failed to register"}))
//     }).catch(err=>{console.log(err);})
// });

module.exports=router;