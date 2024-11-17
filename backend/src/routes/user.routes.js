const express = require('express');
const getAllUser = require('../controllers/user.controller');
const authProtect = require('../middlewares/auth.protect');
const router = express.Router()

router.get("/getalluser",authProtect,getAllUser)

module.exports = router