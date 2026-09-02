import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json(
      { success: true, message: "Logout successful" },
      { status: 200 }
    );

    // ✅ sameSite login route ke sath match karna zaroori hai (lax)
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (error) {
    console.error("Logout error:", error);

    // ⚠️ error.message hataya — internal detail client ko expose nahi karni
    return NextResponse.json(
      { success: false, message: "Logout failed" },
      { status: 500 }
    );
  }
}
