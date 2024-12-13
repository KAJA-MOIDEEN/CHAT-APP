const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors")
const connectionDB = require("./src/config/connection")
const authRoutes = require("./src/routes/auth.routes.js")
const messageRoutes = require("./src/routes/message.route.js");
const corsAllows = require('./src/utils/corsconfig.js');
const userRoutes = require('./src/routes/user.routes.js');
const connectCloudinary = require('./src/config/cloudinary.config.js');
const path = require("path");
require("dotenv").config()
const app = express();

//middleware
app.use(express.json()); //  for parsing application/json
app.use(cookieParser()); //  for parsing cookies
app.use(cors({
    origin:corsAllows.allOrigin, //     allow to server to accept request from different origin
    methods:corsAllows.methods,
    allowedHeaders:corsAllows.allowedHeaders,
    credentials: true,
}));
app.use(express.static(path.join(__dirname,"public")));

//routes
app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);
app.use("/api/user",userRoutes);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


const port = process.env.PORT || 5000

app.listen(port,()=>{
    connectionDB(); // MongoDb connection
    connectCloudinary();// Cloudinary connection
    console.log(`Server Successfully running on http://localhost:${port}`);
})