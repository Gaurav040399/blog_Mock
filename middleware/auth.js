const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth =async (req,res,next)=>{
    try {
        const {token} = req.headers?.Authorization;
        if(!token){
            return res.status(400).send({msg:"You are not Authorize person, Please login"})
        }
        
        const decode = jwt.decode(token,process.env.secret);
        
        if(!decode){
            return res.status(400).send({msg:"You are not Authorize person, Please login"})
        }

        const {userID,email} = decode
        req.userID = userID
        next();
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
}

module.exports = {auth}