const express = require("express")
const {signup, login, logout} = require("../controllers/auth.controller")
const router = express.Router()

router
.post("/signup",signup)
.post("/login",login)
.post("/logout",logout)

module.exports =  router;

