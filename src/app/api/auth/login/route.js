import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/dbConnect";
import { isValidEmail } from "@/lib/validators";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and Password are required" }, { status: 400 });
    }

    // ✅ Regex validation
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        role: user.role || "user",
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    const res = NextResponse.json(
      {
        success: true,
        message: "Login Successful!",
        user: {
          id: user._id.toString(),
          name: user.userName || "",
          fullname: user.fullName || user.userName || "",
          fullName: user.fullName || user.userName || "",
          userName: user.userName || "",
          username: user.userName || "",
          email: user.email,
          phone: user.phone || "",
          role: user.role || "user",
          createdAt: user.createdAt,
          profileImage: user.profileImage || "",
        },
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (err) {
    console.error(err);
    // ⚠️ err detail leak hataya
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

