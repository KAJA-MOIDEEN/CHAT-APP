const User = require("../models/user.model");
const { compareToken } = require("../utils/authToken");

const authProtect = async (req,res,next)=>{
    try {
        const {jwt} = req.cookies;
        if(!jwt){
            return res.status(401).json({success:false,message:"Please log in to access this route"});
        }

        const decoded = await compareToken(jwt)

        const  user = await User.findById(decoded._id).select("-password")
        req.user = user
        next()

    } catch (error) {
        console.log("Error",error.message);
        
    }
}

module.exports = authProtect;