const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { genToken } = require("../utils/authToken");
const setUserToken = require("../utils/authUserDetailToken");

const signup = async (req,res)=>{
    try {
        const {fullName,userName,email,password,confirmPassword,gender,phone} =  req.body;
        
        // check if user already exists
        const existingUser = await User.findOne({userName});
        if (existingUser) {
            return res.status(409).json({error:"Username already exists"})
        }
        // check if email already exists
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(409).json({error:"Email already exists"})
        }
        // check if password and confirmPassword are the same
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords do not match"})
        }
        //  hash password
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password,salt);
        
        //  create new user
        const profilePic =  gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${userName}` : gender ==="female" ? `https://avatar.iran.liara.run/public/girl?username=${userName}` : `https://avatar.iran.liara.run/public/other?username=${userName}`;
        const user = new User({
            fullName,userName,email,password:hasedPassword,gender,profilePic,phone
        });

        await user.save();

        //   generate token
        await genToken(user._id,res);
        const accessToken = await setUserToken(user)
        const userDetails = {
            _id:user._id,
            fullName:user.fullName,
            userName:user.userName,
            email:user.email,
            profilePic:user.profilePic, 
        }
        res.status(201).json({message:"User Created Successfully",
            userDetails,
            accessToken
        });

    } catch (error) {
        console.log("Error",error.message);
        res.status(500).json({message:"Error in signing up"})
    }
}

const login = async (req,res)=>{
    try {
        const  {email,password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compare(password,user?.password || "");

        if(!user ||  !isMatch){
            return res.status(400).json({error:"Invalid Username or Password"})
        }
        
        //   generate token
        await genToken(user._id,res);
        const accessToken = await setUserToken(user)
        const userDetails = {
            _id:user._id,
            fullName:user.fullName,
            userName:user.userName,
            email:user.email,
            profilePic:user.profilePic,
        }
        res.status(200).json({message:"User logged in successfully",
            userDetails,
            accessToken
        })

    } catch (error) {
        console.log("Error",error.message);
        res.status(500).json({message:"Error in login"})
    }
}

const  logout = (req,res)=>{
    try {
        res.cookie('jwt','',{ maxAge:0 });
        res.status(200).json({message:"User logged out successfully"});

    } catch (error) {
        console.log("Error",error.message);
        res.status(500).json({message:"Error in logout"})
    }
}

module.exports = {signup,login,logout}