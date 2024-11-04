const mongoose = require("mongoose");
const { v4 } = require("uuid");

const messageSchema = new  mongoose.Schema({
    _id:{
        type:String,
        required:true,
        default:v4
    },
    senderId: {
        type:String,
        ref:"User",
        required:true
    },
    receiverId:{
        type:String,
        ref:"User",
        required:true
    },
    messages:{
        type:String,
        required:true
    }
    //createdAt,updatedAt
},{timestamps:true});

const  Message = mongoose.model("Message", messageSchema);

module.exports = Message
