import mongoose from "mongoose";

const tourismApplicationSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Rejected"],
      default: "Pending",
    },
    packageId: {
      type: String,
      required: true,
      trim: true,
    },
    packageTitle: {
      type: String,
      required: true,
      trim: true,
    },
    packageLocation: {
      type: String,
      trim: true,
    },
    packageDuration: {
      type: String,
      trim: true,
    },
    packagePrice: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    cnic: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    numberOfPersons: {
      type: String,
      required: true,
      trim: true,
    },
    preferredTravelDate: {
      type: Date,
      required: true,
    },
    applicationDocumentUrl: {
      type: String,
      required: true,
      trim: true,
    },
    documentMimeType: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const TourismApplication =
  mongoose.models.TourismApplication ||
  mongoose.model("TourismApplication", tourismApplicationSchema);

export default TourismApplication;
