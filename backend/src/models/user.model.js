const mongosse = require("mongoose");
const { v4 } = require("uuid");

const userSchema = new mongosse.Schema({
    _id:{type:String,require:true,default:v4},
    fullName:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    gender:{type:String,required:true,enum:["male","female"]},
    profilePic:{type:String,default:""}
},{
    // createdAt,updatedAt
    timestamps:true
});

const User = mongosse.model('User',userSchema);

module.exports = User