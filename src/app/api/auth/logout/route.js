import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json(
      { success: true, message: "Logout successful" },
      { status: 200 }
    );

    
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      { success: false, message: "Logout failed", error: error.message },
      { status: 500 }
    );
  }
}