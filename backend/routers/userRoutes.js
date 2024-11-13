const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  postCourseController,
  getAllCoursesUserController,
  deleteCourseController,
  getAllCoursesController,
  enrolledCourseController,
  sendCourseContentController,
  completeSectionController,
  sendAllCoursesUserController,
} = require("../controllers/userControllers");

const router = express.Router();

// Setup storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Storage path for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // You can adjust the file name if needed
  },
});

// Setup file upload with validation (only allow certain file types)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg, .png, and .pdf files are allowed"), false);
    }
  },
});

// User registration
router.post("/register", registerController);

// User login
router.post("/login", loginController);

// Add a new course (requires teacher authentication)
router.post(
  "/addcourse",
  authMiddleware,
  (req, res, next) => {
    // Check if the user is a teacher
    if (req.user.type !== 'teacher') {
      return res.status(403).send({ message: 'Only teachers can add courses' });
    }
    next();
  },
  upload.array("S_content"), // Expecting multiple files for course content
  postCourseController
);

// Get all courses (no authentication required)
router.get("/getallcourses", getAllCoursesController);

// Get all courses for a specific user (teachers only, requires authentication)
router.get("/getallcoursesteacher", authMiddleware, (req, res, next) => {
  if (req.user.type !== 'teacher') {
    return res.status(403).send({ message: 'Only teachers can view their courses' });
  }
  next();
}, getAllCoursesUserController);

// Delete a course (requires teacher authentication and authorization)
router.delete("/deletecourse/:courseid", authMiddleware, (req, res, next) => {
  // Check if the user is a teacher
  if (req.user.type !== 'teacher') {
    return res.status(403).send({ message: 'Only teachers can delete courses' });
  }
  next();
}, deleteCourseController);

// Enroll in a course (requires student authentication)
router.post("/enrolledcourse/:courseid", authMiddleware, (req, res, next) => {
  // Ensure only students can enroll in courses
  if (req.user.type !== 'student') {
    return res.status(403).send({ message: 'Only students can enroll in courses' });
  }
  next();
}, enrolledCourseController);

// Get course content for a specific course (requires authentication)
router.get("/coursecontent/:courseid", authMiddleware, sendCourseContentController);

// Mark a section/module as complete (requires authentication)
router.post("/completemodule", authMiddleware, completeSectionController);

// Get all courses for a user (authentication required)
router.get("/getallcoursesuser", authMiddleware, sendAllCoursesUserController);

// Get all courses with pagination (example: ?page=1&limit=10)
router.get("/getallcourses", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const courses = await Course.find()
      .skip((page - 1) * limit) // Pagination logic
      .limit(limit);
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch courses" });
  }
});

module.exports = router;

