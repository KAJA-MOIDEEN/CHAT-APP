const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { genToken } = require("../utils/authToken");
const setUserToken = require("../utils/authUserDetailToken");
const Verify = require("../models/verifyToken.model");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');
const UploadImage = require("../utils/cloudinaryFileUpload");


const signup = async (req, res) => {
    try {
        const { fullName, userName, email, password, confirmPassword, gender, phone } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(409).json({ error: "Username already exists" })
        }
        // check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: "Email already exists" })
        }
        // check if password and confirmPassword are the same
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" })
        }
        //  hash password
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);

        //  create new user
        const profilePic = gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${userName}` : gender === "female" ? `https://avatar.iran.liara.run/public/girl?username=${userName}` : `https://avatar.iran.liara.run/public/other?username=${userName}`;
        let user = new User({
            fullName, userName, email, password: hasedPassword, gender, profilePic, phone
        });

        await user.save();

        // create a verification modle
        const verify = await new Verify({
            userId: user._id,
            token: await crypto.randomBytes(32).toString('hex')
        }).save();

        // send email to user for verification
        const url = `${process.env.BASE_URL}${user.id}/verify/${verify.token}/${user.fullName}`
        await sendEmail(user.email, "Verify Email", url)

        res.status(201).json({ message: "An Email Send Your Account Please Verify" });

    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ message: "Error in signing up" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user?.password || "");

        if (!user || !isMatch) {
            return res.status(400).json({ error: "Invalid Username or Password" })
        }
        // console.log(!user.verified);

        if (!user.verified) {
            let token = await Verify.findOne({ userId: user.id })
            if (!token) {
                // create a verification modle
                const verify = await new Verify({
                    userId: user._id,
                    token: await crypto.randomBytes(32).toString('hex')
                }).save();
                // send email to user for verification
                const url = await `${process.env.BASE_URL}${user._id}/verify/${verify.token}/${user.fullName}`

                await sendEmail(user.email, "Verify Email", url)
            }

            return res.status(201).json({ message: "An Email Send Your Account Please Verify" })
        }

        //   generate token
        const token = await genToken(user._id, res);

        const userDetails = {
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            profilePic: user.profilePic,
            about:user.about
        }

        const accessToken = await setUserToken(userDetails)
        res.status(200).json({
            message: "User logged in successfully",
            accessToken
        })
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ message: "Error in login" })
    }
}

const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ message: "Error in logout" })
    }
}

const userVerify = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "Invalid Link" });            
        }

        const token = await Verify.findOne({
            userId: user._id,
            token: req.params.token,
        });
        
        if (!token) return res.status(404).json({ message: "Invalid Link" });

        // Update only the 'verified' field
        await User.updateOne({ _id: user._id }, { $set: { verified: true } });

        // Delete the token document
        await Verify.deleteOne({ _id: token._id });

        res.status(200).json({ message: "Email verified! You can now log in to your account." });

    } catch (error) {
        res.status(500).json({ message: "Error in Verify User" });
        console.log("Error in Verify User", error.message);
    }
};

const profilePic = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded. Please select an image." });
        }
        console.log("Uploaded file details:", req.file);
        // Update the user's profile picture
        const url = await UploadImage(req.file.path, res);
        if (!url) {
            return res.status(500).json({ error: "Failed to upload image. Please try again later." });
          }

        // Update the user's profile picture in the database
        const updatedUser = await User.findByIdAndUpdate({ _id: req.user._id }, { profilePic: url }, { new: true });

        // check updateUser 
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const userDetails = {
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            userName: updatedUser.userName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
            about:updatedUser.about
        }

        const accessToken = await setUserToken(userDetails)
        res.status(200).json({ message: "Profile picture updated successfully", accessToken });

    } catch (error) {
        console.log("Error in profilePic", error.message);
        res.status(400).json({
            error: "Failed to upload image"
        })
    }
}

const editProfile = async (req, res) => {
    try {
        const { data } = req.body
        console.log("PROFILE DATA",data);
        
        const user = req.user
        const updatedUser = await User.findByIdAndUpdate(user._id, data, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const userDetails = {
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            userName: updatedUser.userName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
            about:updatedUser.about
        }

        const accessToken = await setUserToken(userDetails);
        
        res.status(200).json({ message: "Profile updated successfully", accessToken });
    } catch (error) {
        console.log("Error in editProfile", error.message);
        res.status(400).json({ error: "Failed to update profile" })
    }
}
module.exports = { signup, login, logout, userVerify, profilePic, editProfile }