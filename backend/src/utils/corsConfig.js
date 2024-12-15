const corsAllows = {
    allOrigin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://c263-49-43-248-255.ngrok-free.app/",
    ],

    methods:["POST","PUT","DELETE","GET"],
    allowedHeaders:["Content-Type","Authorization","Accept"],
}

module.exports = corsAllows