const cloudinary = require('cloudinary').v2;

// Function to upload an image to Cloudinary
const UploadImage = async (filePath, res) => {
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "User_Profile_Picture", // Upload to this folder
      use_filename: true, // Use original filename
      unique_filename: false, // Do not append random string to the filename
    });

    // Return the secure URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error.message);
    // Throw an error so it can be caught by the caller
    throw new Error("Cloudinary upload failed.");
  }
};

module.exports = UploadImage;
