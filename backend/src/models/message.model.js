const mongoose = require("mongoose");
const { v4 } = require("uuid");

const messageSchema = new  mongoose.Schema({
    _id:{
        type:String,
        required:true,
        default:v4
    },
    senderId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
    //createdAt,updatedAt
},{timestamps:true});

const  Message = mongoose.model("Message", messageSchema);

module.exports = Message
