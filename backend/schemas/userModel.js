const mongoose = require("mongoose");
const bcrypt = require("bcrypt");  // For password hashing

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      set: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      required: [true, "User role is required"],
      enum: ['admin', 'student', 'teacher'],  // Validation for allowed roles
    },
    enrolledCourses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course", // Linking to the 'Course' model
        },
        courseTitle: String,
        enrollmentDate: { type: Date, default: Date.now },
      },
    ],
    teachingCourses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        courseTitle: String,
        dateAssigned: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Password hashing before saving the user
userModel.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password during login
userModel.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userModel);

module.exports = User;
