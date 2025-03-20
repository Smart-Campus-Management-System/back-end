const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const { getTutorProfile, updateTutorProfile, changePassword } = require("../controllers/TprofileController");

// Endpoint to change the password
router.put("/change-password", auth, changePassword);

// Get logged-in tutor's profile
router.get("/tutor", auth, getTutorProfile);

// Update logged-in tutor's profile
router.put("/tutor", auth, updateTutorProfile);

module.exports = router;
