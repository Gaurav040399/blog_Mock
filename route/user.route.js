const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../model/user.model");


userRoute.post("/register",async(req,res)=>{
    try {
        const {email,password} = req.body

        const isUserPresent = await User.findOne({email});

        if(isUserPresent){
            return res.status(400).send({msg:"User already present, Please login"})
        }

        const hash = await bcrypt.hash(password,4);
        const newUser = new User({...req.body, password:hash});
        await newUser.save();
        res.status(200).send({msg:"Register Successfull", user:newUser})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})


userRoute.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body
        const isUserPresent = await User.findOne({email});

        if(!isUserPresent){
            return res.status(400).send({msg:"User Not Found, Please Register"})
        }

        const isPassCorr = await bcrypt.compare(password,isUserPresent.password)

        if(!isPassCorr){
            return res.status(400).send({msg:"Invalid credential"})
        }

        const token = jwt.sign({email:email, userID:isUserPresent._id},process.env.secret)

        res.status(200).send({msg:"login successful",token:token})

    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})



module.exports = {userRoute}