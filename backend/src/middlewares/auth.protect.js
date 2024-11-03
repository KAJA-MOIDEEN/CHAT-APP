const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authProtect = async (req,res,next)=>{
    try {
        const token = req.cookie.jwt
        if(!token){
            return res.status(401).json({success:false,message:"Please log in to access this route"});
        }
        const decoded = await compareToken(token)
        const  user = await User.findById(decoded.id).select("-password")
        req.user = user
        console.log(user);
        next()

    } catch (error) {
        console.log("Error",error.message);
        
    }
}

module.exports = authProtect;