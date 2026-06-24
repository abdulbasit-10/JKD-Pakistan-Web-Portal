import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/userModel";

export async function POST(request) {
  try {
    await connectDB();

    const { token, email, newPassword, confirmPassword } = await request.json();

    if (!token || !email || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "Token, email, and passwords are required" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Hash the token to compare with stored hash
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify token and expiry
    if (
      user.forgotPasswordToken !== tokenHash ||
      !user.forgotPasswordTokenExpiry ||
      user.forgotPasswordTokenExpiry < Date.now()
    ) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful. You can now login with your new password." },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/auth/reset-password error:", error);
    return NextResponse.json(
      { error: "Server error", detail: error.message },
      { status: 500 }
    );
  }
}
