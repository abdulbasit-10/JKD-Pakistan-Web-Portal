import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/userModel";

export async function POST(request) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Return generic success message for security (don't reveal if email exists)
      return NextResponse.json(
        { message: "If this email exists in our system, a password reset link has been sent." },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set expiry to 10 minutes from now
    const expiryTime = Date.now() + 10 * 60 * 1000;

    user.forgotPasswordToken = tokenHash;
    user.forgotPasswordTokenExpiry = expiryTime;
    await user.save();

    // In a production app, you would send an email here
    // For now, we'll return the token to be used in the reset-password link
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    console.log("Password reset link:", resetLink);

    return NextResponse.json(
      {
        message: "If this email exists in our system, a password reset link has been sent.",
        // In production, remove this line - it's just for testing
        resetLink: process.env.NODE_ENV === "development" ? resetLink : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/auth/forgot-password error:", error);
    return NextResponse.json(
      { error: "Server error", detail: error.message },
      { status: 500 }
    );
  }
}
