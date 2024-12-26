const corsAllows = {
    allOrigin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],

    methods:["POST","PUT","DELETE","GET"],
    allowedHeaders:["Content-Type","Authorization","Accept"],
}
module.exports = corsAllows