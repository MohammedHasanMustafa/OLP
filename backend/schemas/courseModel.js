const mongoose = require("mongoose");

const courseModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you're referring to a User model
      required: true,
    },
    C_educator: {
      type: String,
      required: [true, "Educator name is required"],
    },
    C_title: {
      type: String,
      required: [true, "Course title is required"],
    },
    C_categories: {
      type: String,
      required: [true, "Course categories are required"],
    },
    C_price: {
      type: Number, // Using number for price to allow for numerical operations
      required: [true, "Course price is required"],
    },
    C_description: {
      type: String,
      required: [true, "Course description is required"],
    },
    sections: [
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    enrolled: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const courseSchema = mongoose.model("Course", courseModel);

module.exports = courseSchema;

