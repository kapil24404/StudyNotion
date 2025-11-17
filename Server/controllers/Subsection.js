// const Subsection = require("../models/SubSection");
// const Section = require("../models/Section");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");
// const SubSection = require("../models/SubSection");
// require("dotenv").config();

// // exports.createSubsection = async (req, res) => {
// //   try {
// //     // Fetch Data
// //     const { sectionId, title, description } = req.body;

// //     // Extract Video file
// //     const video = req.files.video;

// //     // Validation
// //     if (!sectionId || !title || !description || !video) {
// //       return res.status(400).jon({
// //         success: false,
// //         message: "All fields are required",
// //       });
// //     }

// //     // Upload video to coludinary
// //     const uploadDetails = await uploadImageToCloudinary(
// //       video,
// //       process.env.FOLDER_NAME
// //     );

// //     // Create a subSection
// //     const subSectionDetails = await Subsection.create({
// //       title: title,
// //       timeDuration: `${uploadDetails.duration}`,
// //       description: description,
// //       videoUrl: uploadDetails.secure_url,
// //     });

// //     // Update section with this sub section object Id
// //     const updatedSection = await Section.findByIdAndUpdate(
// //       { _id: sectionId },
// //       { $push: { subSection: subSectionDetails._id } },
// //       { new: true }
// //     ).populate("subSection");
// //     // HM: Log Updated section hare, after adding populate quary

// //     // Return response
// //     return res.status(200).json({
// //       success: true,
// //       message: "Sub Section Created successfully",
// //       data: updatedSection,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to create Sub section",
// //       error: error.message,
// //     });
// //   }
// // };


// exports.createSubSection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body;

//     if (!sectionId || !title || !description || !req.files?.videoFile) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Upload video to cloudinary
//     const uploadedVideo = await uploadImageToCloudinary(
//       req.files.videoFile,
//       process.env.FOLDER_NAME
//     );

//     const subSection = await SubSection.create({
//       title,
//       description,
//       videoUrl: uploadedVideo.secure_url,
//     });

//     await Section.findByIdAndUpdate(sectionId, {
//       $push: { subSection: subSection._id },
//     });

//     const updatedSection = await Section.findById(sectionId)
//       .populate("subSection")
//       .exec();

//     return res.status(200).json({
//       success: true,
//       message: "SubSection created succ essfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.log("CREATE SUBSECTION ERROR →", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create SubSection",
//     });
//   }
// };


// // HM: Update Sub section
// exports.updateSubsection = async (req, res) => {
//   try {
//     const { sectionId, subSectionId, title, description } = req.body;
//     const subSection = await Subsection.findById(subSectionId);

//     if (!subSection) {
//       return res.status(404).json({
//         success: false,
//         message: "Sub-section not found",
//       });
//     }

//     if (title !== undefined) {
//       subSection.title = title;
//     }

//     if (description !== undefined) {
//       subSection.description = description;
//     }

//     if (req.files && req.files.video !== undefined) {
//       const video = req.files.video;
//       const uploadDetails = await uploadImageToCloudinary(
//         video,
//         process.env.FOLDER_NAME
//       );
//       subSection.videoUrl = uploadDetails.secure_url;
//       subSection.timeDuration = `${uploadDetails.duration}`;
//     }

//     await subSection.save();

//     // Update Section
//     const updatedSection = await Section.findById(sectionId).populate(
//       "subSection"
//     );
//     return res.json({
//       success: true,
//       message: "Section updated successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the section",
//     });
//   }
// };

// // HM: Delete sub Section
// exports.deleteSubsection = async (req, res) => {
//   try {
//     const { subSectionId, sectionId } = req.body;
//     await Section.findByIdAndUpdate(
//       { _id: sectionId },
//       { $pull: { subSection: subSectionId } }
//     );

//     const subSection = await SubSection.findByIdAndDelete({
//       _id: subSectionId,
//     });

//     if (!subSection) {
//       return res.status(404).json({
//         success: false,
//         message: "SubSection not found",
//       });
//     }

//     const updatedSection = await Section.findById(sectionId).populate(
//       "subSection"
//     );

//     return res.json({
//       success: true,
//       message: "SubSection deleted successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while deleting the SubSection",
//     });
//   }
// };


//post chechk

// const SubSection = require("../models/SubSection");
// const Section = require("../models/Section");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");
// require("dotenv").config();

// // ---------------- Create SubSection ----------------
// exports.createSubSection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body;

//     if (!sectionId || !title || !description || !req.files?.videoFile) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Upload video
//     const uploadedVideo = await uploadImageToCloudinary(
//       req.files.videoFile,
//       process.env.FOLDER_NAME
//     );

//     const subSection = await SubSection.create({
//       title,
//       description,
//       videoUrl: uploadedVideo.secure_url,
//     });

//     await Section.findByIdAndUpdate(sectionId, {
//       $push: { subSection: subSection._id },
//     });

//     const updatedSection = await Section.findById(sectionId)
//       .populate("subSection")
//       .exec();

//     return res.status(200).json({
//       success: true,
//       message: "SubSection created successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.log("CREATE SUBSECTION ERROR →", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create SubSection",
//     });
//   }
// };

// // ---------------- Update SubSection ----------------
// exports.updateSubSection = async (req, res) => {
//   try {
//     const { sectionId, subSectionId, title, description } = req.body;

//     const subSection = await SubSection.findById(subSectionId);
//     if (!subSection) {
//       return res.status(404).json({
//         success: false,
//         message: "SubSection not found",
//       });
//     }

//     if (title !== undefined) subSection.title = title;
//     if (description !== undefined) subSection.description = description;

//     // video update
//     if (req.files?.videoFile) {
//       const uploadedVideo = await uploadImageToCloudinary(
//         req.files.videoFile,
//         process.env.FOLDER_NAME
//       );
//       subSection.videoUrl = uploadedVideo.secure_url;
//     }

//     await subSection.save();

//     const updatedSection = await Section.findById(sectionId).populate(
//       "subSection"
//     );

//     return res.json({
//       success: true,
//       message: "SubSection updated successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update SubSection",
//     });
//   }
// };

// // ---------------- Delete SubSection ----------------
// exports.deleteSubSection = async (req, res) => {
//   try {
//     const { subSectionId, sectionId } = req.body;

//     await Section.findByIdAndUpdate(sectionId, {
//       $pull: { subSection: subSectionId },
//     });

//     const deleted = await SubSection.findByIdAndDelete(subSectionId);

//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "SubSection not found",
//       });
//     }

//     const updatedSection = await Section.findById(sectionId).populate(
//       "subSection"
//     );

//     return res.json({
//       success: true,
//       message: "SubSection deleted successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete SubSection",
//     });
//   }
// };







// const SubSection = require("../models/SubSection");
// const Section = require("../models/Section");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");
// require("dotenv").config();

// // ---------------- CREATE SUBSECTION ----------------
// exports.createSubSection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body;

//     if (!sectionId || !title || !description || !req.files?.videoFile) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Upload video -- IMPORTANT FIX
//     const uploadedVideo = await uploadImageToCloudinary(
//       req.files.videoFile,
//       process.env.FOLDER_NAME,
//       null,
//       null,
//       "video"             // FORCE VIDEO UPLOAD
//     );

//     const subSection = await SubSection.create({
//       title,
//       description,
//       videoUrl: uploadedVideo.secure_url,
//       timeDuration: uploadedVideo.duration,
//     });

//     await Section.findByIdAndUpdate(sectionId, {
//       $push: { subSection: subSection._id },
//     });

//     const updatedSection = await Section.findById(sectionId)
//       .populate("subSection")
//       .exec();

//     return res.status(200).json({
//       success: true,
//       message: "SubSection created successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.log("CREATE SUBSECTION ERROR →", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create SubSection",
//     });
//   }
// };

// // ---------------- UPDATE SUBSECTION ----------------
// exports.updateSubSection = async (req, res) => {
//   try {
//     const { sectionId, subSectionId, title, description } = req.body;

//     const subSection = await SubSection.findById(subSectionId);

//     if (!subSection) {
//       return res.status(404).json({
//         success: false,
//         message: "SubSection not found",
//       });
//     }

//     if (title) subSection.title = title;
//     if (description) subSection.description = description;

//     // Update video if provided
//     if (req.files?.videoFile) {
//       const uploadedVideo = await uploadImageToCloudinary(
//         req.files.videoFile,
//         process.env.FOLDER_NAME,
//         null,
//         null,
//         "video"
//       );

//       subSection.videoUrl = uploadedVideo.secure_url;
//       subSection.timeDuration = uploadedVideo.duration;
//     }

//     await subSection.save();

//     const updatedSection = await Section.findById(sectionId).populate(
//       "subSection"
//     );

//     return res.json({
//       success: true,
//       message: "SubSection updated successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.log("UPDATE SUBSECTION ERROR →", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update SubSection",
//     });
//   }
// };

// // ---------------- DELETE SUBSECTION ----------------
// exports.deleteSubSection = async (req, res) => {
//   try {
//     const { subSectionId, sectionId } = req.body;

//     await Section.findByIdAndUpdate(sectionId, {
//       $pull: { subSection: subSectionId },
//     });

//     const deleted = await SubSection.findByIdAndDelete(subSectionId);

//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "SubSection not found",
//       });
//     }

//     const updatedSection = await Section.findById(sectionId)
//       .populate("subSection")
//       .exec();

//     return res.json({
//       success: true,
//       message: "SubSection deleted successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.log("DELETE SUBSECTION ERROR →", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete SubSection",
//     });
//   }
// };




//test


const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// ---------------- CREATE SUBSECTION ----------------
exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;

    if (!sectionId || !title || !description || !req.files?.videoFile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Upload video to cloudinary
    const uploadedVideo = await uploadImageToCloudinary(
      req.files.videoFile,
      process.env.FOLDER_NAME,
      null,
      null,
      "video"       // NOW VALID
    );

    const subSection = await SubSection.create({
      title,
      description,
      videoUrl: uploadedVideo.secure_url,
      timeDuration: uploadedVideo.duration,
    });

    await Section.findByIdAndUpdate(sectionId, {
      $push: { subSection: subSection._id },
    });

    const updatedSection = await Section.findById(sectionId)
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("CREATE SUBSECTION ERROR →", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create SubSection",
    });
  }
};

// ---------------- UPDATE SUBSECTION ----------------
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title) subSection.title = title;
    if (description) subSection.description = description;

    // Upload new video if provided
    if (req.files?.videoFile) {
      const uploadedVideo = await uploadImageToCloudinary(
        req.files.videoFile,
        process.env.FOLDER_NAME,
        null,
        null,
        "video"
      );

      subSection.videoUrl = uploadedVideo.secure_url;
      subSection.timeDuration = uploadedVideo.duration;
    }

    await subSection.save();

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("UPDATE SUBSECTION ERROR →", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update SubSection",
    });
  }
};

// ---------------- DELETE SUBSECTION ----------------
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    const deleted = await SubSection.findByIdAndDelete(subSectionId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("DELETE SUBSECTION ERROR →", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete SubSection",
    });
  }
};
