const mongoose = require("mongoose");
const { v4 } = require("uuid");

const userSchema = new mongoose.Schema({
    _id:{type:String,require:true,default:v4},
    fullName:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    phone:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    gender:{type:String,required:true,enum:["male","female","others"]},
    profilePic:{type:String,default:""},
    verified:{type:Boolean,default:false}
},{
    // Automatically adds createdAt and updatedAt
    timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User