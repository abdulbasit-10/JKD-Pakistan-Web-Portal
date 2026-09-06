import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Rejected"],
      default: "Pending",
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, trim: true },
    eventType: { type: String, required: true, trim: true },
    cateringService: { type: String, required: true, trim: true },
    audioVisual: { type: String, required: true, trim: true },
    decorations: { type: String, required: true, trim: true },
    eventDateTime: { type: String, required: true, trim: true },
    paymentMethod: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
