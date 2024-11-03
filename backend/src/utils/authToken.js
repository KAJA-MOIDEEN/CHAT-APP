const jwt = require("jsonwebtoken");

const genToken = async (_id, res) => {
   const token = await jwt.sign({ _id }, process.env.JWT_SECRET_KEY,{expiresIn:"15d"});
   res.cookie("jwt",token,{
    httpOnly:true, //  cookie is accessible only by server and privent xss attacks cross-side scripting attacks
    maxAge: 15 * 24 * 60 * 60 * 1000, //  ms
    sameSite: "strict", // CSRF attacks cross-side request forgery protection
    secure: process.env.NODE_ENV !== "development", // cookie is accessible only by https protocol
   });
}

const compareToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = { genToken, compareToken };
