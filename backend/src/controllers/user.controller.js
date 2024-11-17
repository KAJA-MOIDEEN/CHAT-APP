const User = require("../models/user.model");

const getAllUser = async (req,res) => {
    try {
        const {_id:loggedInUserId} = req.user
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in GetAllUser controllers: ",error.message);
        res.status(500).json({ message:"Internal Server Error" });  
    }
}

module.exports = getAllUser