const mongoose = require("mongoose");

const enrolledCourseSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Use capital "Course" for consistency with model names
      required: true, // Ensure the course ID is always provided
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Use capital "User" for consistency with model names
      required: true, // Ensure the user ID is always provided
    },
    courseLength: {
      type: Number,
      required: true, // Ensure course length is provided
      min: [1, "Course length must be at least 1 day"], // Add a validation to ensure a positive number
    },
    progress: {
      type: [{ sectionId: mongoose.Schema.Types.ObjectId, completed: Boolean }],
      default: [], // Make progress an empty array by default
    },
    certificateDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("EnrolledCourse", enrolledCourseSchema);
