import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Apply from "@/models/applyModel";

export async function GET(request) {
  try {
    await connectDB();

    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Sirf isi user ki apni applications
    const applications = await Apply.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(applications, { status: 200 });
  } catch (err) {
    console.error("GET /api/apply/my error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
