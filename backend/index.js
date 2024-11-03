const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors")
const connectionDB = require("./src/config/connection")
const authRoutes = require("./src/routes/auth.routes.js")
const messageRoutes = require("./src/routes/message.route.js")
require("dotenv").config()
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1");
});

const port = process.env.PORT || 5000
app.listen(port,()=>{
    connectionDB();
    console.log(`Server Successfully running on http://localhost:${port}`);
    
})