const cloudinary = require("cloudinary");

const connectCloudinary = async () => {
  try {
   await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
    console.log("Successfully Connected to Cloudinary.");
  } catch (error) {
    console.error("Error Connecting to Cloudinary:", {
      message: error.message,
      stack: error.stack,
    });
    // Optionally, throw the error to notify the calling function
    throw new Error("Failed to Configure Cloudinary. Please Check your environment variables.");
  }
};

module.exports = connectCloudinary;
