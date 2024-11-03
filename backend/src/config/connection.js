const mongoose = require("mongoose")

const connectionDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected");
    } catch (error) {
        console.log("MongoDB Connection Error")
        console.log("Error",error.message);
    }
}
module.exports = connectionDB