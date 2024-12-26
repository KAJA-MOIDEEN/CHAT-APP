const express = require("express")
const {signup, login, logout, userVerify, profilePic, editProfile} = require("../controllers/auth.controller");
const authProtect = require("../middlewares/auth.protect");
const upload = require("../middlewares/multer");
const router = express.Router()

router
.post("/signup",signup)
.post("/login",login)
.post("/logout",logout)
.get("/:id/verify/:token",userVerify)
//profile pic upload
.post("/profilePic",upload.single("profilePic"),authProtect, profilePic)
.put("/edit-profile",authProtect,editProfile)

module.exports =  router;

