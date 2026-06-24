// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {    
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 255,
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
    organization: {
      type: String,
      trim: true,
    },
    prefferedDate: {  
      type: Date,
    },
    prefferedTime: {
      type: String, // e.g. "10:30 AM - 11:30 AM"
      trim: true,
    },
    emergencyContact: {
      type: String,
      trim: true,
    },
    medical: {
      type: String,
      trim: true,
    },
    idImageUrl: {
      type: String,
      trim: true,
    },
    signatureName: {
      type: String,
      trim: true,
    },
    eventFee: {
      type: String,
      trim: true,
    },
    paymentMethod: {  
      type: String,
      trim: true,
    },
    paymentReferenceNumber: {
      type: String,
      trim: true,
    },
    paymentScreenshotUrl: {  
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

 const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

 export default Booking;

