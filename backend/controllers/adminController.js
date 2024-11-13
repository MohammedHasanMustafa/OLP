const userSchema = require("../schemas/userModel");
const courseSchema = require("../schemas/courseModel");

// Helper function for error handling
const handleError = (res, error, customMessage) => {
  console.error(error);
  res.status(500).send({ success: false, message: customMessage || error.message });
};

// Controller to get all users
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userSchema.find();
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).send({ message: "No users found" });
    }
    res.status(200).send({ success: true, data: allUsers });
  } catch (error) {
    handleError(res, error, "Failed to fetch users");
  }
};

// Controller to get all courses
const getAllCoursesController = async (req, res) => {
  try {
    const allCourses = await courseSchema.find();
    if (!allCourses || allCourses.length === 0) {
      return res.status(404).send({ message: "No courses found" });
    }
    res.status(200).send({ success: true, data: allCourses });
  } catch (error) {
    handleError(res, error, "Failed to fetch courses");
  }
};

// Controller to delete a course by ID
const deleteCourseController = async (req, res) => {
  const { courseid } = req.params;
  try {
    if (!courseid) {
      return res.status(400).send({ success: false, message: "Course ID is required" });
    }
    const course = await courseSchema.findByIdAndDelete(courseid);
    if (!course) {
      return res.status(404).send({ success: false, message: "Course not found" });
    }
    res.status(200).send({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    handleError(res, error, "Failed to delete course");
  }
};

// Controller to delete a user by ID
const deleteUserController = async (req, res) => {
  const { userid } = req.params;
  try {
    if (!userid) {
      return res.status(400).send({ success: false, message: "User ID is required" });
    }
    const user = await userSchema.findByIdAndDelete(userid);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    res.status(200).send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    handleError(res, error, "Failed to delete user");
  }
};

module.exports = {
  getAllUsersController,
  getAllCoursesController,
  deleteCourseController,
  deleteUserController,
};
