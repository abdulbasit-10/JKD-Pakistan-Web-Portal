import mongoose from "mongoose";

const applySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    fatherName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      // unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    dateOfBirth: {
      type: Date,
    },
    whatsappNumber: {
      type: String,
      trim: true,
      match: [/^\d{10,15}$/, "Phone number must be between 10–15 digits"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\d{10,15}$/, "Phone number must be between 10–15 digits"],
    },
    // address: {
    //   type: String,
    //   trim: true,
    //   maxlength: 255,
    // },
    CNIC: {
      type: String,
      // unique: true,
    //   match: [/^\d{13}$/, "CNIC must be a 13-digit number"],
    },
    parentCNIC: {
      type: String,
    //   match: [/^\d{13}$/, "Parent CNIC must be a 13-digit number"],
    },
    // age: {
    //   type: Number,
    // },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    province: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    tehsil: {
      type: String,
      trim: true,
    },
    chooseCourse: {
      type: String,
      trim: true,
    },
    CNICPictureUrl: {
      type: String,
      trim: true,
    },
    qualificationUrl: {
      type: String,
      trim: true,
    },
    passportSizePicUrl: {
      type: String,
      trim: true,
    },
    passportUrl: {
      type: String,
      trim: true,
    },
    challanUrl: {
      type: String,
      default: "",
      trim: true,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // assumes you have a User model
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Apply =
  mongoose.models.Apply || mongoose.model("Apply", applySchema);

export default Apply;
