const mongoose = require("mongoose")
const {v4} = require("uuid")

const verifySchema = mongoose.Schema({
    _id:{
        type:String,
        required:true,
        default:v4
    },
    userId:{
        type:String,
        required:true,
        ref:"User"
    },
    token:{
        type:String,
        required:true
    },
    expires:{ type :Date,required:true,default:Date.now(),expires:3600 } //Hour
},{
    timestamps:{}
})

const Verify = mongoose.model("Verify",verifySchema)

module.exports = Verify