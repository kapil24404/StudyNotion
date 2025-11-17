// const Course = require("../models/Course");
// const Category = require("../models/Category");
// const User = require("../models/User");
// const CourseProgress = require("../models/CourseProgress");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");
// const { convertSecondsToDuration } = require("../utils/secToDuration");
// const Section = require("../models/Section");
// const SubSection = require("../models/SubSection");
// require("dotenv").config();

// // Create course handler
// exports.createCourse = async (req, res) => {
//   try {
//     // Fetch data
//     let {
//       courseName,
//       courseDescription,
//       whatYouWillLearn,
//       price,
//       tag: _tag,
//       category,
//       status,
//       instructions: _instructions,
//     } = req.body;

//     // Get thumbnail
//     const thumbnail = req.files.thumbnailImage;

//     const tag = JSON.parse(_tag);
//     const instructions = JSON.parse(_instructions);
//     // Validation
//     if (
//       !courseName ||
//       !courseDescription ||
//       !whatYouWillLearn ||
//       !price ||
//       !tag.length ||
//       !thumbnail ||
//       !category ||
//       !instructions.length
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     if (!status || status === undefined) {
//       status = "Draft";
//     }

//     // Check for instructor
//     const userId = req.user.id;
//     const instructorDetails = await User.findById(userId, {
//       accountType: "Instructor",
//     });

//     if (!instructorDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Instructor Details not found",
//       });
//     }

//     // Check given category is valid or not
//     const categoryDetails = await Category.findById(category);

//     if (!categoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Category Details not found",
//       });
//     }

//     // Upload image to cloudinary
//     const thumbnailImage = await uploadImageToCloudinary(
//       thumbnail,
//       process.env.FOLDER_NAME
//     );

//     // Create an entry for new course in db
//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,
//       instructor: instructorDetails._id,
//       whatYouWillLearn: whatYouWillLearn,
//       price,
//       tag,
//       category: categoryDetails._id,
//       thumbnail: thumbnailImage.secure_url,
//       status: status,
//       instructions: instructions,
//     });

//     // Add the new course to the user schema of the instructor
//     await User.findByIdAndUpdate(
//       { _id: instructorDetails._id },
//       { $push: { courses: newCourse._id } },
//       { new: true }
//     );

//     // Update category schema
//     const categorys = await Category.findByIdAndUpdate(
//       { _id: category },
//       { $push: { courses: newCourse._id } },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Course created successfully",
//       data: newCourse,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create course",
//       error: error.message,
//     });
//   }
// };

// // Get all courses handler
// exports.showAllCourses = async (req, res) => {
//   try {
//     const allCourses = await Course.find(
//       { status: "Published" },
//       {
//         courseName: true,
//         price: true,
//         thumbnail: true,
//         instructor: true,
//         ratingAndReviews: true,
//         studentsEnrolled: true,
//       }
//     )
//       .populate("instructor")
//       .exec();

//     return res.status(200).json({
//       success: true,
//       message: "Data for all courses fetched successfully",
//       data: allCourses,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Cannot fetch course data",
//       error: error.message,
//     });
//   }
// };

// // Get Course Details
// exports.getCourseDetails = async (req, res) => {
//   try {
//     // Get Id
//     const { courseId } = req.body;

//     // Find Course and populale all details
//     const courseDetails = await Course.findOne({ _id: courseId })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//           select: "-videoUrl",
//         },
//       })
//       .exec();

//     // Validation
//     if (!courseDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find the course with ${courseId}`,
//       });
//     }

//     // console.log("Printing Course Content: ", courseDetails.courseContent);
//     // Calculate Total Duration
//     let totalDurationInSeconds = 0;
//     courseDetails.courseContent.forEach((content) => {
//       content.subSection.forEach((subSection) => {
//         const timeDuration = parseInt(subSection.timeDuration);
//         totalDurationInSeconds += timeDuration;
//       });
//     });

//     const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

//     // Return successfull response
//     return res.status(200).json({
//       success: true,
//       message: "Course detailse fetched successfully",
//       data: {
//         courseDetails,
//         totalDuration,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Edit Course
// exports.editCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const updates = req.body;

//     const course = await Course.findById(courseId);

//     if (!courseId) {
//       return res.status(404).json({
//         success: false,
//         message: "Course Not Found",
//       });
//     }

//     if (req.files) {
//       const thumbnail = req.files.thumbnailImage;
//       const thumbnailImage = await uploadImageToCloudinary(
//         thumbnail,
//         process.env.FOLDER_NAME
//       );

//       course.thumbnail = thumbnailImage.secure_url;
//     }

//     // Update only the fields that are present in the request body
//     for (const key in updates) {
//       if (updates.hasOwnProperty(key)) {
//         if (key === "tag" || key === "instructions") {
//           course[key] = JSON.parse(updates[key]);
//         } else {
//           course[key] = updates[key];
//         }
//       }
//     }

//     await course.save();

//     const updatedCourse = await Course.findOne({ _id: courseId })
//       .populate({
//         path: "instructor",
//         populate: { path: "additionalDetails" },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({ path: "courseContent", populate: { path: "subSection" } })
//       .exec();

//     res.json({
//       success: true,
//       message: "Course Updated Successfully",
//       data: updatedCourse,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// // Get Instructior course
// exports.getInstructorCourse = async (req, res) => {
//   try {
//     const instructorId = req.user.id;

//     const instructorCourses = await Course.find({
//       instructor: instructorId,
//     }).sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       data: instructorCourses,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve instructor courses",
//       error: error.message,
//     });
//   }
// };

// // Get Full Course Details
// exports.getFullCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const userId = req.user.id;

//     const courseDetails = await Course.findOne({ _id: courseId })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({ path: "courseContent", populate: { path: "subSection" } })
//       .exec();

//     if (!courseDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could Not Find The Course With ID: ${courseId}`,
//       });
//     }

//     let courseProgressCount = await CourseProgress.findOne({
//       courseId: courseId,
//       userid: userId,
//     });

//     let totalDurationInSeconds = 0;

//     courseDetails.courseContent.forEach((content) => {
//       content.subSection.forEach((subSection) => {
//         const timeDurationInSeconds = parseInt(subSection.timeDuration);
//         totalDurationInSeconds += timeDurationInSeconds;
//       });
//     });

//     const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

//     return res.status(200).json({
//       success: true,
//       data: {
//         courseDetails,
//         totalDuration,
//         completedVideos: courseProgressCount?.completedVideos
//           ? courseProgressCount?.completedVideos
//           : [],
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Delete Course
// exports.deleteCourse = async (req, res) => {
//   const { courseId } = req.body;

//   // Find The Course
//   const course = await Course.findById(courseId);

//   if (!course) {
//     return res.status(404).json({
//       success: false,
//       message: "Course Not Found",
//     });
//   }

//   // Unenroll students from the course
//   const studentsEnrolled = course.studentsEnrolled;

//   for (const studentId of studentsEnrolled) {
//     await User.findByIdAndUpdate(studentId, { $pull: { courses: courseId } });
//   }

//   // Delete section and subsection
//   const courseSection = course.courseContent;

//   for (const sectionId of courseSection) {
//     // Delete subsection of the section
//     const section = await Section.findById(sectionId);

//     if (section) {
//       const subSections = section.subSection;

//       for (const subSectionId of subSections) {
//         await SubSection.findByIdAndDelete(subSectionId);
//       }
//     }

//     // Delete The Section
//     await Section.findByIdAndDelete(sectionId);
//   }

//   // Delete The Course
//   await Course.findByIdAndDelete(courseId);

//   return res.status(200).json({
//     success: true,
//     message: "Course Deleted",
//   });
// };


// const Course = require("../models/Course");
// const Category = require("../models/Category");
// const User = require("../models/User");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");
// require("dotenv").config();

// // -----------------------------
// // Create Course
// // -----------------------------
// const createCourse = async (req, res) => {
//   try {
//     const {
//       courseName,
//       courseDescription,
//       whatYouWillLearn,
//       price,
//       tag: _tag,
//       category,
//       status,
//       instructions: _instructions,
//       thumbnailImage: thumbnailUrl, // optional URL
//     } = req.body;

//     const tag = _tag ? JSON.parse(_tag) : [];
//     const instructions = _instructions ? JSON.parse(_instructions) : [];

//     if (
//       !courseName ||
//       !courseDescription ||
//       !whatYouWillLearn ||
//       !price ||
//       !tag.length ||
//       !category ||
//       !instructions.length ||
//       (!req.files?.thumbnailImage && !thumbnailUrl)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All required fields must be provided",
//       });
//     }

//     const userId = req.user.id;
//     const instructor = await User.findById(userId);

//     if (!instructor || instructor.accountType !== "Instructor") {
//       return res.status(403).json({
//         success: false,
//         message: "Only instructors can create courses",
//       });
//     }

//     const categoryDetails = await Category.findById(category);
//     if (!categoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // Handle thumbnail
//     let thumbnailImage;
//     if (req.files?.thumbnailImage) {
//       thumbnailImage = await uploadImageToCloudinary(
//         req.files.thumbnailImage,
//         process.env.FOLDER_NAME
//       );
//     } else {
//       thumbnailImage = { secure_url: thumbnailUrl };
//     }

//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,
//       instructor: instructor._id,
//       whatYouWillLearn,
//       price,
//       tag,
//       category: categoryDetails._id,
//       thumbnail: thumbnailImage.secure_url,
//       status: status || "Draft",
//       instructions,
//     });

//     // Add course reference to instructor and category
//     await User.findByIdAndUpdate(instructor._id, {
//       $push: { courses: newCourse._id },
//     });
//     await Category.findByIdAndUpdate(categoryDetails._id, {
//       $push: { courses: newCourse._id },
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Course created successfully",
//       data: newCourse,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create course",
//       error: error.message,
//     });
//   }
// };

// // -----------------------------
// // Edit Course
// // -----------------------------
// const editCourse = async (req, res) => {
//   try {
//     const { courseId, ...updates } = req.body;
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     // Update thumbnail if new file uploaded
//     if (req.files?.thumbnailImage) {
//       const thumbnailImage = await uploadImageToCloudinary(
//         req.files.thumbnailImage,
//         process.env.FOLDER_NAME
//       );
//       updates.thumbnail = thumbnailImage.secure_url;
//     }

//     // Parse tag and instructions if present
//     if (updates.tag) updates.tag = JSON.parse(updates.tag);
//     if (updates.instructions) updates.instructions = JSON.parse(updates.instructions);

//     Object.assign(course, updates);
//     await course.save();

//     return res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: course,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update course",
//       error: error.message,
//     });
//   }
// };

// // -----------------------------
// // Delete Course
// // -----------------------------
// const deleteCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     await Course.findByIdAndDelete(courseId);

//     return res.json({
//       success: true,
//       message: "Course deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete course",
//       error: error.message,
//     });
//   }
// };

// // -----------------------------
// // Get All Courses
// // -----------------------------
// const showAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().populate("instructor category");
//     return res.json({
//       success: true,
//       data: courses,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -----------------------------
// // Get Instructor Courses
// // -----------------------------
// const getInstructorCourse = async (req, res) => {
//   try {
//     const instructorId = req.user.id;
//     const courses = await Course.find({ instructor: instructorId });
//     return res.json({ success: true, data: courses });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -----------------------------
// // Get Course Details
// // -----------------------------
// const getCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const course = await Course.findById(courseId).populate("instructor category");
//     if (!course)
//       return res.status(404).json({ success: false, message: "Course not found" });
//     return res.json({ success: true, data: course });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -----------------------------
// // Get Full Course Details (with progress, etc.)
// // -----------------------------
// const getFullCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const course = await Course.findById(courseId).populate("instructor category");
//     if (!course)
//       return res.status(404).json({ success: false, message: "Course not found" });
//     return res.json({ success: true, data: course });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   createCourse,
//   editCourse,
//   deleteCourse,
//   showAllCourses,
//   getInstructorCourse,
//   getCourseDetails,
//   getFullCourseDetails,
// };






// const Course = require("../models/Course");
// const Category = require("../models/Category");
// const User = require("../models/User");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");
// require("dotenv").config();

// // ----------------------------------------------------
// // Create Course
// // ----------------------------------------------------
// exports.createCourse = async (req, res) => {
//   try {
//     const {
//       courseName,
//       courseDescription,
//       whatYouWillLearn,
//       price,
//       tag,
//       category,
//       status,
//       instructions,
//     } = req.body;

//     // Parse arrays
//     const parsedTag = tag ? JSON.parse(tag) : [];
//     const parsedInstructions = instructions ? JSON.parse(instructions) : [];

//     // Validation
//     if (
//       !courseName ||
//       !courseDescription ||
//       !whatYouWillLearn ||
//       !price ||
//       !parsedTag.length ||
//       !category ||
//       !parsedInstructions.length ||
//       !req.files?.thumbnailImage
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Check instructor
//     const instructor = await User.findById(req.user.id);
//     if (!instructor || instructor.accountType !== "Instructor") {
//       return res.status(403).json({
//         success: false,
//         message: "Only instructors can create courses",
//       });
//     }

//     // Check category
//     const categoryDetails = await Category.findById(category);
//     if (!categoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // Upload thumbnail
//     const thumbnail = await uploadImageToCloudinary(
//       req.files.thumbnailImage,
//       process.env.FOLDER_NAME
//     );

//     // Create course
//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,
//       instructor: instructor._id,
//       whatYouWillLearn,
//       price,
//       tag: parsedTag,
//       category: categoryDetails._id,
//       thumbnail: thumbnail.secure_url,
//       status: status || "Draft",
//       instructions: parsedInstructions,
//     });

//     // Add course reference to instructor + category
//     await User.findByIdAndUpdate(instructor._id, {
//       $push: { courses: newCourse._id },
//     });

//     await Category.findByIdAndUpdate(categoryDetails._id, {
//       $push: { courses: newCourse._id },
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Course created successfully",
//       data: newCourse,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create course",
//     });
//   }
// };

// // ----------------------------------------------------
// // Edit Course
// // ----------------------------------------------------
// exports.editCourse = async (req, res) => {
//   try {
//     const { courseId, ...updates } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     // Upload thumbnail if provided
//     if (req.files?.thumbnailImage) {
//       const thumbnail = await uploadImageToCloudinary(
//         req.files.thumbnailImage,
//         process.env.FOLDER_NAME
//       );
//       updates.thumbnail = thumbnail.secure_url;
//     }

//     // Parse fields if they exist
//     if (updates.tag) updates.tag = JSON.parse(updates.tag);
//     if (updates.instructions)
//       updates.instructions = JSON.parse(updates.instructions);

//     Object.assign(course, updates);
//     await course.save();

//     return res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: course,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update course",
//     });
//   }
// };

// // ----------------------------------------------------
// // Delete Course
// // ----------------------------------------------------
// exports.deleteCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     await Course.findByIdAndDelete(courseId);

//     return res.json({
//       success: true,
//       message: "Course deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete course",
//     });
//   }
// };

// // ----------------------------------------------------
// // Show All Courses
// // ----------------------------------------------------
// exports.showAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().populate("instructor category");
//     return res.json({
//       success: true,
//       data: courses,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ----------------------------------------------------
// // Instructor Courses
// // ----------------------------------------------------
// exports.getInstructorCourse = async (req, res) => {
//   try {
//     const instructorId = req.user.id;
//     const courses = await Course.find({ instructor: instructorId });
//     return res.json({
//       success: true,
//       data: courses,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ----------------------------------------------------
// // Get Single Course
// // ----------------------------------------------------
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const course = await Course.findById(courseId).populate(
//       "instructor category"
//     );

//     if (!course)
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });

//     return res.json({
//       success: true,
//       data: course,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ----------------------------------------------------
// // Get Full Course Details
// // ----------------------------------------------------
// exports.getFullCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId).populate(
//       "instructor category"
//     );

//     if (!course)
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });

//     return res.json({
//       success: true,
//       data: course,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





// const Course = require("../models/Course");
// const Category = require("../models/Category");
// const User = require("../models/User");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");
// require("dotenv").config();

// // ----------------------------------------------------
// // Create Course
// // ----------------------------------------------------
// exports.createCourse = async (req, res) => {
//   try {
//     const {
//       courseName,
//       courseDescription,
//       whatYouWillLearn,
//       price,
//       tag,
//       category,
//       status,
//       instructions,
//     } = req.body;

//     // Always convert tag to array
//     let parsedTag = [];
//     try {
//       parsedTag =
//         typeof tag === "string"
//           ? JSON.parse(tag)
//           : Array.isArray(tag)
//           ? tag
//           : [];
//     } catch {
//       parsedTag = [];
//     }

//     // Always convert instructions to array
//     let parsedInstructions = [];
//     try {
//       parsedInstructions =
//         typeof instructions === "string"
//           ? JSON.parse(instructions)
//           : Array.isArray(instructions)
//           ? instructions
//           : [];
//     } catch {
//       parsedInstructions = [];
//     }

//     // Validation
//     if (
//       !courseName ||
//       !courseDescription ||
//       !whatYouWillLearn ||
//       !price ||
//       !parsedTag.length ||
//       !category ||
//       !parsedInstructions.length ||
//       !req.files?.thumbnailImage
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Check instructor
//     const instructor = await User.findById(req.user.id);
//     if (!instructor || instructor.accountType !== "Instructor") {
//       return res.status(403).json({
//         success: false,
//         message: "Only instructors can create courses",
//       });
//     }

//     // Fix category object / string case
//     const categoryId =
//       typeof category === "object" ? category._id : category;

//     const categoryDetails = await Category.findById(categoryId);
//     if (!categoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // Upload thumbnail
//     const thumbnail = await uploadImageToCloudinary(
//       req.files.thumbnailImage,
//       process.env.FOLDER_NAME
//     );

//     // Create Course
//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,
//       instructor: instructor._id,
//       whatYouWillLearn,
//       price,
//       tag: parsedTag,
//       category: categoryDetails._id,
//       thumbnail: thumbnail.secure_url,
//       status: status || "Draft",
//       instructions: parsedInstructions,
//     });

//     // Add course reference to instructor
//     await User.findByIdAndUpdate(instructor._id, {
//       $push: { courses: newCourse._id },
//     });

//     // Add course reference to category
//     await Category.findByIdAndUpdate(categoryDetails._id, {
//       $push: { courses: newCourse._id },
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Course created successfully",
//       data: newCourse,
//     });
//   } catch (error) {
//     console.error("CREATE COURSE ERROR:", error);

//   return res.status(500).json({
//     success: false,
//     message: "Failed to create course",
//     error: error.message,
//     stack: error.stack,
//     body: req.body,
//     hasFiles: Boolean(req.files),
//     files: req.files ? Object.keys(req.files) : null,
//     });
//   }
// };

// // ----------------------------------------------------
// // Edit Course
// // ----------------------------------------------------
// exports.editCourse = async (req, res) => {
//   try {
//     const { courseId, ...updates } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     // Upload thumbnail if provided
//     if (req.files?.thumbnailImage) {
//       const thumbnail = await uploadImageToCloudinary(
//         req.files.thumbnailImage,
//         process.env.FOLDER_NAME
//       );
//       updates.thumbnail = thumbnail.secure_url;
//     }

//     // Parse fields if required
//     if (updates.tag && typeof updates.tag === "string") {
//       updates.tag = JSON.parse(updates.tag);
//     }

//     if (updates.instructions && typeof updates.instructions === "string") {
//       updates.instructions = JSON.parse(updates.instructions);
//     }

//     Object.assign(course, updates);
//     await course.save();

//     return res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: course,
//     });
//   } catch (error) {
//     console.error("EDIT COURSE ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update course",
//       error: error.message,
//     });
//   }
// };

// // ----------------------------------------------------
// // Delete Course
// // ----------------------------------------------------
// exports.deleteCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     await Course.findByIdAndDelete(courseId);

//     return res.json({
//       success: true,
//       message: "Course deleted successfully",
//     });
//   } catch (error) {
//     console.error("DELETE COURSE ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete course",
//       error: error.message,
//     });
//   }
// };

// // ----------------------------------------------------
// // Get All Courses
// // ----------------------------------------------------
// exports.showAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().populate("instructor category");
//     return res.json({
//       success: true,
//       data: courses,
//     });
//   } catch (error) {
//     console.error("SHOW ALL COURSES ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ----------------------------------------------------
// // Instructor Courses
// // ----------------------------------------------------
// exports.getInstructorCourse = async (req, res) => {
//   try {
//     const instructorId = req.user.id;
//     const courses = await Course.find({ instructor: instructorId });

//     return res.json({
//       success: true,
//       data: courses,
//     });
//   } catch (error) {
//     console.error("INSTRUCTOR COURSE ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ----------------------------------------------------
// // Get Single Course
// // ----------------------------------------------------
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId).populate(
//       "instructor category"
//     );

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     return res.json({
//       success: true,
//       data: course,
//     });
//   } catch (error) {
//     console.error("GET COURSE DETAILS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ----------------------------------------------------
// // Get Full Course Details
// // ----------------------------------------------------
// exports.getFullCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId).populate(
//       "instructor category"
//     );

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     return res.json({
//       success: true,
//       data: course,
//     });
//   } catch (error) {
//     console.error("FULL COURSE DETAILS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();


// ----------------------------------------------------
// Create Course
// ----------------------------------------------------
const createCourse = async (req, res) => {
  try {
    console.log("REQ.BODY =>", req.body);
    console.log("REQ.FILES =>", req.files);

    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    // Parse tag
    let parsedTag = [];
    try {
      parsedTag = typeof tag === "string" ? JSON.parse(tag) : tag || [];
    } catch {
      parsedTag = [];
    }

    // Parse instructions
    let parsedInstructions = [];
    try {
      parsedInstructions =
        typeof instructions === "string"
          ? JSON.parse(instructions)
          : instructions || [];
    } catch {
      parsedInstructions = [];
    }

    // Check required fields
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !parsedTag.length ||
      !category ||
      !parsedInstructions.length ||
      !req.files?.thumbnailImage
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check Instructor
    const instructor = await User.findById(req.user.id);
    if (!instructor || instructor.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can create courses",
      });
    }

    // Validate Category
    const categoryId =
      typeof category === "object" ? category._id : category;

    const categoryDetails = await Category.findById(categoryId);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Upload to Cloudinary
    const thumbnail = await uploadImageToCloudinary(
      req.files.thumbnailImage,
      process.env.FOLDER_NAME
    );

    // Create Course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructor._id,
      whatYouWillLearn,
      price,
      tag: parsedTag,
      category: categoryDetails._id,
      thumbnail: thumbnail.secure_url,
      status: status || "Draft",
      instructions: parsedInstructions,
    });

    // Push course to instructor
    await User.findByIdAndUpdate(instructor._id, {
      $push: { courses: newCourse._id },
    });

    // Push course to category
    await Category.findByIdAndUpdate(categoryDetails._id, {
      $push: { courses: newCourse._id },
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
      stack: error.stack,
      body: req.body,
      hasFiles: Boolean(req.files),
      files: req.files ? Object.keys(req.files) : null,
    });
  }
};


// ----------------------------------------------------
// Edit Course
// ----------------------------------------------------
const editCourse = async (req, res) => {
  try {
    const { courseId, ...updates } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Replace thumbnail if exists
    if (req.files?.thumbnailImage) {
      const upload = await uploadImageToCloudinary(
        req.files.thumbnailImage,
        process.env.FOLDER_NAME
      );
      updates.thumbnail = upload.secure_url;
    }

    // If tag or instructions are strings → parse
    if (updates.tag && typeof updates.tag === "string") {
      updates.tag = JSON.parse(updates.tag);
    }

    if (updates.instructions && typeof updates.instructions === "string") {
      updates.instructions = JSON.parse(updates.instructions);
    }

    Object.assign(course, updates);
    await course.save();

    return res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    console.error("EDIT COURSE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};


// ----------------------------------------------------
// Delete Course
// ----------------------------------------------------
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await Course.findByIdAndDelete(courseId);

    return res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};


// ----------------------------------------------------
// Get All Courses
// ----------------------------------------------------
const showAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor category");
    return res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("SHOW ALL COURSES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ----------------------------------------------------
// Get Instructor Courses
// ----------------------------------------------------
const getInstructorCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const courses = await Course.find({ instructor: instructorId });

    return res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("INSTRUCTOR COURSE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ----------------------------------------------------
// Get Course Details
// ----------------------------------------------------
const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId).populate(
      "instructor category"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("GET COURSE DETAILS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ----------------------------------------------------
// Get Full Course Details
// ----------------------------------------------------
// const getFullCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId).populate(
//       "instructor category"
//     );

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     return res.json({
//       success: true,
//       data: course,
//     });
//   } catch (error) {
//     console.error("FULL COURSE DETAILS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// ----------------------------------------------------
// Get Full Course Details (FIXED VERSION)
// ----------------------------------------------------
const getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // 🔥 FULL POPULATE: Instructor, Category, Sections, SubSections
    const course = await Course.findById(courseId)
      .populate("instructor")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.json({
      success: true,
      data: {
        courseDetails: course, // UI expects courseDetails key
      },
    });
  } catch (error) {
    console.error("FULL COURSE DETAILS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------------------------------------
// EXPORT ALL CONTROLLERS (IMPORTANT)
// ----------------------------------------------------
module.exports = {
  createCourse,
  editCourse,
  deleteCourse,
  showAllCourses,
  getInstructorCourse,
  getCourseDetails,
  getFullCourseDetails,
};
