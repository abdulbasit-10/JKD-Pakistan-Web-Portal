import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/userModel";

export async function PUT(request) {
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

    const currentUser = await User.findById(decoded.sub).select(
      "_id email userName fullName phone role createdAt profileImage"
    );

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const fullName = body?.fullName?.trim() || currentUser.fullName || currentUser.userName;
    const userName = body?.userName?.trim() || currentUser.userName;
    const email = body?.email?.trim() || currentUser.email;
    const phone = body?.phone?.trim() ?? currentUser.phone ?? "";

    const duplicateQuery = { _id: { $ne: decoded.sub }, $or: [] };
    if (email !== currentUser.email) duplicateQuery.$or.push({ email });
    if (userName !== currentUser.userName) duplicateQuery.$or.push({ userName });

    if (duplicateQuery.$or.length > 0) {
      const duplicateUser = await User.findOne(duplicateQuery);
      if (duplicateUser) {
        return NextResponse.json({ error: "Username or email already exists" }, { status: 409 });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.sub,
      { fullName, userName, email, phone },
      { new: true }
    ).select("_id email userName fullName phone role createdAt profileImage");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: {
          id: updatedUser._id.toString(),
          name: updatedUser.fullName || updatedUser.userName,
          fullname: updatedUser.fullName || updatedUser.userName,
          fullName: updatedUser.fullName || updatedUser.userName,
          userName: updatedUser.userName,
          username: updatedUser.userName,
          email: updatedUser.email,
          phone: updatedUser.phone || "",
          role: updatedUser.role || "user",
          profileImage: updatedUser.profileImage || "",
          createdAt: updatedUser.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/users/profile error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 }); // detail hataya
  }
}

