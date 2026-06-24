import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/userModel"; // Make sure model is correct

export async function GET(request) {
  try {
    // Connect database
    await connectDB();

    // Get token & verify
    const token = request.headers.get("x-user-token");
    console.log("Token in /api/users:", token);
    const decoded = token && jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decoded?.sub || !decoded?.email) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // Fetch all users
    const users = await User.find().select("-password"); 
    // remove password field for security

    return NextResponse.json(users, { status: 200 });

  } catch (error) {
    console.error("GET /api/users error:", error);

    return NextResponse.json(
      { error: "Server error", detail: error.message },
      { status: 500 }
    );
  }
}
