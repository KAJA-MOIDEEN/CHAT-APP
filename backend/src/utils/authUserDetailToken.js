const jwt = require("jsonwebtoken")

const setUserToken =async (user)=>{
    return jwt.sign({user},process.env.JWT_USER_KEY,{expiresIn:"1h"})
}

module.exports = setUserToken