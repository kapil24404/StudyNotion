// const cloudinary = require("cloudinary").v2;

// exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
//   const options = { folder };

//   if (height) {
//     options.height = height;
//   }
//   if (quality) {
//     options.quality = quality;
//   }

//   options.resource_type = "auto";

//   return await cloudinary.uploader.upload(file.tempFilePath, options);
// };


// const cloudinary = require("cloudinary").v2;

// exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
//   try {
//     const options = { folder, resource_type: "auto" };

//     if (height) options.height = height;
//     if (quality) options.quality = quality;

//     console.log("Uploading file →", file.tempFilePath);

//     const uploadedImage = await cloudinary.uploader.upload(
//       file.tempFilePath,
//       options
//     );

//     console.log("Cloudinary Upload Success →", uploadedImage.secure_url);

//     return uploadedImage;

//   } catch (error) {
//     console.error("CLOUDINARY UPLOAD ERROR → ", error.message);
//     throw error;
//   }
// };



//test


const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (
  file,
  folder,
  height,
  quality,
  type = "auto"   // <---- ADD THIS
) => {
  try {
    const options = {
      folder,
      resource_type: type,   // <---- IMPORTANT FIX
    };

    if (height) options.height = height;
    if (quality) options.quality = quality;

    console.log("Uploading file →", file.tempFilePath);

    const uploadedAsset = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );

    console.log("Cloudinary Upload Success →", uploadedAsset.secure_url);

    return uploadedAsset;

  } catch (error) {
    console.error("CLOUDINARY UPLOAD ERROR → ", error);
    throw error;
  }
};
