// const express = require("express");
// const app = express();

// require("dotenv").config();

// const userRouts = require("./routes/User");
// const profileRouts = require("./routes/Profile");
// const paymentRouts = require("./routes/Payment");
// const courseRouts = require("./routes/Course");
// const contactUsRouts = require("./routes/Contact");

// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const { cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");
// const categoryRoutes = require("./routes/Category");

// const PORT = process.env.PORT ;

// // Database connect
// database.connect();

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// // Cloudinary connection
// cloudinaryConnect();

// // Mount routs
// app.use("/api/v1/auth", userRouts);
// app.use("/api/v1/profile", profileRouts);
// app.use("/api/v1/course", courseRouts);
// app.use("/api/v1/payment", paymentRouts);
// app.use("/api/v1/reach", contactUsRouts);
// app.use("/api/v1/category", categoryRoutes);
// // Default route
// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "Your server is up and running...",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`App is running at ${PORT}`);
// });


// const express = require("express");
// const app = express();
// require("dotenv").config();

// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payment");
// const courseRoutes = require("./routes/Course");
// const contactUsRoutes = require("./routes/Contact");

// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const { cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");

// // Port configuration
// const PORT = process.env.PORT || 5000;

// // ✅ 1. Connect Database
// database.connect();

// // ✅ 2. Apply Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*", // For testing; replace with frontend URL later
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// // ✅ 3. Connect Cloudinary
// cloudinaryConnect();

// // ✅ 4. Mount Routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoutes);

// // ✅ 5. Default Route
// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "✅ Server is up and running successfully...",
//   });
// });

// // ✅ 6. Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on PORT ${PORT}`);
// });


//Import Required Packages
// const express = require("express");
// const app = express();
// require("dotenv").config();
// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");

// // Import Config Files
// const database = require("./config/database");
// const { cloudinaryConnect } = require("./config/cloudinary");

// // Import Routes
// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payment");
// const courseRoutes = require("./routes/Course");
// const contactUsRoutes = require("./routes/Contact");

// // Define Port
// const PORT = process.env.PORT || 5000;

// // --------------------------------------------------------
// // ✅ 1. Connect to Database
// // --------------------------------------------------------
// database.connect();

// // --------------------------------------------------------
// // ✅ 2. Middlewares
// // --------------------------------------------------------
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*", // Replace * with your frontend URL in production
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// // --------------------------------------------------------
// // ✅ 3. Connect to Cloudinary
// // --------------------------------------------------------
// cloudinaryConnect();

// // --------------------------------------------------------
// // ✅ 4. Define Routes
// // --------------------------------------------------------
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoutes);

// // --------------------------------------------------------
// // ✅ 5. Default Route
// // --------------------------------------------------------
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "✅ StudyNotion Server is up and running successfully!",
//   });
// });

// // --------------------------------------------------------
// // ✅ 6. Start Server
// // --------------------------------------------------------
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on PORT ${PORT}`);
// });


//index.js
// const express = require("express");
// const app = express(); // ✅ app must be declared FIRST
// require("dotenv").config();

// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payment");
// const courseRoutes = require("./routes/Course");
// const contactUsRoutes = require("./routes/Contact");

// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const { cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");
// const cloudinary = require("cloudinary").v2;

// // ✅ 1. Port Configuration
// const PORT = process.env.PORT || 4000;

// // ✅ 2. Connect Database
// database.connect();

// // ✅ 3. Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// // ✅ 4. Cloudinary Connection
// cloudinaryConnect();

// // ✅ 5. Mount Routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoutes);

// // ✅ 6. Default Route
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "✅ Server is up and running successfully...",
//   });
// });

// // ✅ 7. Test Cloudinary Upload Route
// app.post("/api/v1/test/upload", async (req, res) => {
//   try {
//     const uploadResult = await cloudinary.uploader.upload(
//       "https://res.cloudinary.com/demo/image/upload/sample.jpg", // Sample image
//       { folder: "test_uploads" }
//     );

//     res.json({
//       success: true,
//       message: "✅ Cloudinary test image uploaded successfully!",
//       data: uploadResult,
//     });
//   } catch (error) {
//     console.error("❌ Cloudinary upload failed:", error);
//     res.status(500).json({
//       success: false,
//       message: "Cloudinary upload failed",
//       error: error.message,
//     });
//   }
// });

// // ✅ 8. Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on PORT ${PORT}`);
// });


// const express = require("express");
// const app = express();
// require("dotenv").config();

// // Import Routes
// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payment");
// const courseRoutes = require("./routes/Course");
// const contactUsRoutes = require("./routes/Contact");

// // Import Configs
// const database = require("./config/database");
// const { cloudinaryConnect } = require("./config/cloudinary");

// // Import Middlewares
// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");
// const cloudinary = require("cloudinary").v2;

// // =======================
// // 🔧 Server Configuration
// // =======================
// const PORT = process.env.PORT || 4000;

// // Connect Database
// database.connect();

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// // Cloudinary Connect
// cloudinaryConnect();

// // =======================
// // 🛣️ Mount Routes
// // =======================
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoutes);

// // =======================
// // 🧭 Base Test Routes
// // =======================

// // Root route
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "✅ Server is up and running successfully...",
//   });
// });

// // API base route
// app.get("/api/v1", (req, res) => {
//   res.json({
//     success: true,
//     message: "✅ API Base Route Working!",
//     routes: [
//       "/api/v1/auth",
//       "/api/v1/profile",
//       "/api/v1/course",
//       "/api/v1/payment",
//       "/api/v1/reach",
//     ],
//   });
// });

// // Cloudinary test upload
// app.post("/api/v1/test/upload", async (req, res) => {
//   try {
//     const uploadResult = await cloudinary.uploader.upload(
//       "https://res.cloudinary.com/demo/image/upload/sample.jpg", // sample image
//       { folder: "test_uploads" }
//     );

//     res.json({
//       success: true,
//       message: "✅ Cloudinary test image uploaded successfully!",
//       data: uploadResult,
//     });
//   } catch (error) {
//     console.error("❌ Cloudinary upload failed:", error);
//     res.status(500).json({
//       success: false,
//       message: "Cloudinary upload failed",
//       error: error.message,
//     });
//   }
// });

// // =======================
// // 🚀 Start Server
// // =======================
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on PORT ${PORT}`);
// });





// index.js
// const express = require("express");
// const app = express();
// require("dotenv").config();

// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");
// const cloudinary = require("cloudinary").v2;

// // Import Config Files
// const database = require("./config/database");
// const { cloudinaryConnect } = require("./config/cloudinary");

// // Import Routes
// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payment");
// const courseRoutes = require("./routes/Course");
// const contactUsRoutes = require("./routes/Contact");

// // -----------------------------
// // ✅ 1. Port Configuration
// // -----------------------------
// const PORT = process.env.PORT || 5000;

// // -----------------------------
// // ✅ 2. Connect to Database
// // -----------------------------
// database.connect();

// // -----------------------------
// // ✅ 3. Middlewares
// // -----------------------------
// app.use(express.json()); // for JSON body
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*", // Replace * with frontend URL in production
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// // -----------------------------
// // ✅ 4. Connect to Cloudinary
// // -----------------------------
// cloudinaryConnect();

// // -----------------------------
// // ✅ 5. Mount Routes
// // -----------------------------
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoutes);

// // -----------------------------
// // ✅ 6. Default Route
// // -----------------------------
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "✅ StudyNotion Server is up and running successfully!",
//   });
// });

// // -----------------------------
// // ✅ 7. Test Cloudinary Upload
// // -----------------------------
// app.post("/api/v1/test/upload", async (req, res) => {
//   try {
//     const uploadResult = await cloudinary.uploader.upload(
//       "https://res.cloudinary.com/demo/image/upload/sample.jpg", // Sample image
//       { folder: "test_uploads" }
//     );

//     res.json({
//       success: true,
//       message: "✅ Cloudinary test image uploaded successfully!",
//       data: uploadResult,
//     });
//   } catch (error) {
//     console.error("❌ Cloudinary upload failed:", error);
//     res.status(500).json({
//       success: false,
//       message: "Cloudinary upload failed",
//       error: error.message,
//     });
//   }
// });

// // -----------------------------
// // ✅ 8. Start Server
// // -----------------------------
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on PORT ${PORT}`);
// });



// const express = require("express");
// const app = express();

// require("dotenv").config();

// const userRouts = require("./routes/User");
// const profileRouts = require("./routes/Profile");
// const paymentRouts = require("./routes/Payment");
// const courseRouts = require("./routes/Course");
// const contactUsRouts = require("./routes/Contact");
// const categoryRoutes = require("./routes/Category");  // ✅ ADDED

// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const { cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");

// const PORT = process.env.PORT;

// // Connect Database
// database.connect();

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );

// // File Upload
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// // Cloudinary
// cloudinaryConnect();

// // -----------------------------
// // Mount Routes (IMPORTANT)
// // -----------------------------
// app.use("/api/v1/auth", userRouts);
// app.use("/api/v1/profile", profileRouts);
// app.use("/api/v1/course", courseRouts);
// app.use("/api/v1/payment", paymentRouts);
// app.use("/api/v1/reach", contactUsRouts);

// // Default route
// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "Your server is up and running...",
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`App is running at ${PORT}`);
// });












// const express = require("express");
// const app = express();

// require("dotenv").config();

// // ⭐ Load ALL models so mongoose registers them once (IMPORTANT)
// require("./models/User");
// require("./models/Course");
// require("./models/Section");
// require("./models/SubSection");
// require("./models/Category");
// require("./models/RatingAndReview");

// const userRouts = require("./routes/User");
// const profileRouts = require("./routes/Profile");
// const paymentRouts = require("./routes/Payment");
// const courseRouts = require("./routes/Course");
// const contactUsRouts = require("./routes/Contact");
// const categoryRoutes = require("./routes/Category");

// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const { cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");

// const PORT = process.env.PORT;

// // Database connect
// database.connect();

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// // Cloudinary connection
// cloudinaryConnect();

// // Mount routes
// app.use("/api/v1/auth", userRouts);
// app.use("/api/v1/profile", profileRouts);
// app.use("/api/v1/course", courseRouts);
// app.use("/api/v1/payment", paymentRouts);
// app.use("/api/v1/reach", contactUsRouts);
// app.use("/api/v1/category", categoryRoutes);

// // Default route
// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "Your server is up and running...",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`App is running at ${PORT}`);
// });


const express = require("express");
const app = express();

require("dotenv").config();

// ------------------------
// Load ALL Models Once
// ------------------------
require("./models/User");
require("./models/Course");
require("./models/Section");
require("./models/SubSection");
require("./models/Category");
require("./models/RatingAndReview");

// ------------------------
// Import Routes
// ------------------------
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/Contact");
const categoryRoutes = require("./routes/Category");

// ------------------------
// Other Dependencies
// ------------------------
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// ------------------------
// Server Port
// ------------------------
const PORT = process.env.PORT || 4000;

// ------------------------
// Connect to Database
// ------------------------
database.connect();

// ------------------------
// Middlewares
// ------------------------
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ------------------------
// File Upload Middleware
// ------------------------
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
    debug: true,   // 🔥 helps identify issues
  })
);

// ------------------------
// Cloudinary Init
// ------------------------
cloudinaryConnect();

// ------------------------
// Mount Routes
// ------------------------
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);
app.use("/api/v1/category", categoryRoutes);
//app.use("/api/v1/course", courseRouts);

// ------------------------
// Default Route
// ------------------------
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// ------------------------
// Start Server
// ------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
