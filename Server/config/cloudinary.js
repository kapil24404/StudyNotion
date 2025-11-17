// const cloudinary = require("cloudinary").v2;

// require("dotenv").config();

// exports.cloudinaryConnect = () => {
//   try {
//     cloudinary.config({
//       cloud_name: process.env.CLOUD_NAME,
//       api_key: process.env.API_KEY,
//       api_secret: process.env.API_SECRET,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };




// const cloudinary = require("cloudinary").v2;

// exports.cloudinaryConnect = () => {
//   try {
//     cloudinary.config({
//       cloud_name: process.env.CLOUD_NAME,
//       api_key: process.env.API_KEY,
//       api_secret: process.env.API_SECRET,
//     });
//     console.log("✅ Cloudinary connected successfully!");
//   } catch (error) {
//     console.error("❌ Cloudinary connection failed:", error.message);
//   }
// };


const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("✅ Cloudinary connected successfully!");
    console.log("Cloudinary ENV Check:", {
      CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      API_KEY: process.env.CLOUDINARY_API_KEY ? "OK" : "MISSING",
      API_SECRET: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
    });

  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error.message);
  }
};

