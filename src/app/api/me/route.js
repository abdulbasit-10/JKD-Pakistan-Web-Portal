import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/userModel";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decoded.sub).select(
      "_id email userName fullName phone role createdAt profileImage"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          name: user.fullName || user.userName,
          fullname: user.fullName || user.userName,
          fullName: user.fullName || user.userName,
          userName: user.userName,
          username: user.userName,
          email: user.email,
          phone: user.phone,
          role: user.role || "user",
          profileImage: user.profileImage || "",
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}