const express = require("express");
const router = express.Router();
const { auth, isTutor, isAdminOrTutor} = require("../middlewares/authMiddleware");
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/courseController");

// Public: Get All Courses
router.get("/", getAllCourses);

// Public: Get Course by ID
router.get("/:courseId", getCourseById);

// Admin-only: Add Course
router.post("/add", auth, isAdminOrTutor, addCourse);

// Admin-only: Update Course by ID
router.put("/:courseId", auth, isTutor, updateCourseById);

// Admin-only: Delete Course by ID
router.delete("/:courseId", auth, isTutor, deleteCourseById);

module.exports = router;
