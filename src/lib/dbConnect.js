import mongoose from "mongoose";

let isConnected = false; // track connection

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    console.log("🚀 MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
