const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllCoursesController,
  deleteCourseController,
  deleteUserController,
} = require("../controllers/adminController");

const router = express.Router();

// Utility function to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Access forbidden: Admins only", success: false });
  }
  next();
};

// Get all users (admin only)
router.get("/getallusers", authMiddleware, isAdmin, getAllUsersController);

// Get all courses (admin only)
router.get("/getallcourses", authMiddleware, isAdmin, getAllCoursesController);

// Delete a course (admin only)
router.delete("/deletecourse/:courseid", authMiddleware, isAdmin, deleteCourseController);

// Delete a user (admin only)
router.delete("/deleteuser/:cuserid", authMiddleware, isAdmin, deleteUserController);

module.exports = router;
