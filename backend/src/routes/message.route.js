const express = require("express");
const authProtect = require("../middlewares/auth.protect");
const sendMessage = require("../controllers/message.controller");
const router = express.Router();

router.post("/send/:id",authProtect,sendMessage)
router.get('/get/:id')
module.exports = router