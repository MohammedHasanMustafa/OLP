const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      set: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true // Add unique constraint to prevent duplicate emails
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Explicitly set the collection name to "users"
const userSchema = mongoose.model("User", userModel, "users");

module.exports = userSchema;
