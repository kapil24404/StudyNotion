// const SubSection = require("../models/SubSection");
// const Section = require("../models/Section");
// const CourseProgress = require("../models/CourseProgress");

// exports.updateCourseProgress = async (req, res) => {
//   const { courseId, subSectionId } = req.body;
//   const userId = req.user.id;

//   try {
//     const subSection = await SubSection.findById(subSectionId);

//     if (!subSection) {
//       return res.status(404).json({
//         success: false,
//         message: "SinSection Not Found",
//       });
//     }

//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     });

//     if (!courseProgress) {
//       return res.status(404).json({
//         success: false,
//         message: "Course progress Does Not Exist",
//       });
//     } else {
//       if (courseProgress.completedVideos.includes(subSectionId)) {
//         return res.status(400).json({
//           success: false,
//           message: "Video Already Marked As Complete",
//         });
//       }

//       courseProgress.completedVideos.push(subSectionId);
//     }

//     await courseProgress.save();

//     return res.status(200).json({
//       success: true,
//       message: "Course Progress Updated",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }

// };





const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    // -----------------------------
    // 1. Validate Subsection
    // -----------------------------
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // -----------------------------
    // 2. Find existing progress OR create if missing
    // -----------------------------
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      // Auto-create empty progress instead of throwing 404
      courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });
    }

    // -----------------------------
    // 3. Check if already marked complete
    // -----------------------------
    if (courseProgress.completedVideos.includes(subSectionId)) {
      return res.status(400).json({
        success: false,
        message: "Lecture already marked as completed",
      });
    }

    // -----------------------------
    // 4. Mark as complete
    // -----------------------------
    courseProgress.completedVideos.push(subSectionId);
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
      completedVideos: courseProgress.completedVideos,
    });

  } catch (error) {
    console.error("UPDATE COURSE PROGRESS ERROR →", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
