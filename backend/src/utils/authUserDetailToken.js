const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const setUserToken =async (user)=>{
    console.log("kaja moideen");
    
    return jwt.sign({user},process.env.JWT_USER_KEY,{expiresIn:"1h"})
}

module.exports = setUserToken