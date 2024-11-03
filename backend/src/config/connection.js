const mongoose = require("mongoose")

const connectionDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log("DB connected"))
        .catch((error)=>console.log("MongoDB Connection Error",error.message))
}
module.exports = connectionDB