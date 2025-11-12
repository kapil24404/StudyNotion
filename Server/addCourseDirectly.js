require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./models/Course"); // your Course model

// Destructure ObjectId
const { ObjectId } = mongoose.Types;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Instructor info from login response
const instructorId = "691177579e44b61ed7bc7083"; // _id from logged-in user

// Example course data
const newCourse = {
  courseName: "Complete React & Redux Bootcamp",
  courseDescription: "Learn React from scratch, including Redux for state management, hooks, and advanced patterns.",
  instructor: new ObjectId(instructorId),  // ✅ fixed
  price: 499,
  thumbnail: "/Users/kapilgarg/Documents/WEB_D/StudyNotion/react.jpg",
  category: new ObjectId("64f8c1c2a1b2c3d4e5f67890"), // ✅ fixed
  courseContent: [],
  tag: [],
  studentsEnrolled: [],
  instructions: [],
};

async function addCourse() {
  try {
    const course = await Course.create(newCourse);
    console.log("✅ Course added successfully:", course);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding course:", error);
    process.exit(1);
  }
}

addCourse();
