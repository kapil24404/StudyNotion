const express = require("express");
const router = express.Router();

// Import controllers
const {
  createCategory,
  showAllCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// -------------------------
// CATEGORY ROUTES
// -------------------------

// Create a new category
router.post("/createCategory", createCategory);

// Get all categories
router.get("/showAllCategory", showAllCategory);

// Category page details
router.post("/categoryPageDetails", categoryPageDetails);

// Export router
module.exports = router;
