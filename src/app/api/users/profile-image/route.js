import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/userModel";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 3 * 1024 * 1024; // 3MB — profile pic ke liye kaafi hai

export async function POST(request) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const formData = await request.formData();
    const profileImage = formData.get("profileImage");

    if (!profileImage || typeof profileImage === "string") {
      return NextResponse.json({ error: "Profile image is required" }, { status: 400 });
    }

    // ✅ File type/size validation
    if (!ALLOWED_TYPES.includes(profileImage.type)) {
      return NextResponse.json({ error: "Only JPG, PNG or WEBP images are allowed" }, { status: 400 });
    }
    if (profileImage.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "Image must be under 3MB" }, { status: 400 });
    }

    const arrayBuffer = await profileImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${profileImage.type};base64,${base64}`;

    const uploadResult = await uploadImageToCloudinary(dataUri);

    const updatedUser = await User.findByIdAndUpdate(
      decoded.sub,
      { profileImage: uploadResult.secure_url },
      { new: true }
    ).select("_id email userName role createdAt profileImage");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile image uploaded successfully", profileImage: updatedUser.profileImage },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/users/profile-image error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 }); // detail hataya
  }
}

