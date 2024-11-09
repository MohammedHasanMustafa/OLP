const mongoose = require("mongoose");

const coursePaymentModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Use "User" for the reference model
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Use "Course" for the reference model
      required: true,
    },
    cardDetails: {
      cardholdername: {
        type: String,
        required: [true, "Cardholder name is required"],
      },
      cardnumber: {
        type: String, // Change this to String as card numbers often have leading zeros
        required: [true, "Card number is required"],
        match: [/^\d{16}$/, "Invalid card number"], // Validate that it is a 16-digit number
      },
      cvvcode: {
        type: Number,
        required: [true, "CVV code is required"],
        min: [100, "CVV must be a 3-digit number"], // Validate that CVV is a 3-digit number
        max: [999, "CVV must be a 3-digit number"],
      },
      expmonthyear: {
        type: String,
        required: [true, "Expiration month and year are required"],
        match: [/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date format"], // Validate expiration date format (MM/YY)
      },
    },
    status: {
      type: String,
      default: "enrolled",
      enum: ["enrolled", "paid", "failed", "pending"], // Ensure valid statuses
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const coursePaymentSchema = mongoose.model("CoursePayment", coursePaymentModel);

module.exports = coursePaymentSchema;
