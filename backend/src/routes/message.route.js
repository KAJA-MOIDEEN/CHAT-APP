const express = require("express");
const authProtect = require("../middlewares/auth.protect");
const {sendMessage, getMessages} = require("../controllers/message.controller");
const router = express.Router();

router.post("/send/:id",authProtect,sendMessage);
router.get('/get/:id',authProtect,getMessages);

module.exports = router