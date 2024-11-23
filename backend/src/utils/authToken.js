const jwt = require("jsonwebtoken");

const genToken = async (_id, res) => {
    try {
        const token = await jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });
        res.cookie("jwt", token, {
            httpOnly: true, // Cookie is accessible only by the server, preventing XSS attacks
            maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds (15 days)
            sameSite: "lax", // Prevents CSRF attacks by restricting cross-site requests
            secure: process.env.NODE_ENV !== "development", // Cookie is sent only over HTTPS in production
            domain: "localhost", // For local dev
            path: "/",
        });
        return token;
    } catch (error) {
        console.error("Token generation error:", error);
        res.status(500).send("Token generation failed");
    }
 };
 

const compareToken = async (token,res) => {
    
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!token) {
        return res.status(401).json({message: "Invalid token"})   
    }
    return decoded
}

module.exports = { genToken, compareToken };
