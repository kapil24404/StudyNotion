require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const path = require("path");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Local file path
const filePath = path.resolve(
  "/Users/kapilgarg/Documents/WEB_D/StudyNotion/images.jpeg"
);

// Upload function
async function uploadImage() {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: process.env.FOLDER_NAME,
      use_filename: true,
      unique_filename: false,
    });
    console.log("✅ Upload successful!");
    console.log("URL:", result.secure_url);
  } catch (err) {
    console.error("❌ Upload failed:", err);
  }
}

// Run the upload
uploadImage();
