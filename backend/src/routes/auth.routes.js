const express = require("express")
const {signup, login, logout, userVerify} = require("../controllers/auth.controller")
const router = express.Router()

router
.post("/signup",signup)
.post("/login",login)
.post("/logout",logout)
.get("/:id/verify/:token",userVerify)

module.exports =  router;

