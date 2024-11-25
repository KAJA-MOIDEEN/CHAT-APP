const express = require("express")
const {signup, login, logout, userVerify, profilePic} = require("../controllers/auth.controller");
const authProtect = require("../middlewares/auth.protect");
const upload = require("../middlewares/multer");
const router = express.Router()

router
.post("/signup",signup)
.post("/login",login)
.post("/logout",logout)
.get("/:id/verify/:token",userVerify)
.post("/profilePic",upload.single("profilePic"),authProtect, profilePic)

module.exports =  router;

