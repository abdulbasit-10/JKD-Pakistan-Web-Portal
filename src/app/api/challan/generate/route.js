import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import { generateChallan } from "@/lib/generateChallan";

export async function POST(request) {
  try {
    await connectDB();
    const { applicationId } = await request.json();

    const challan = await generateChallan(applicationId);

    return NextResponse.json(
      { message: "Challan generated successfully", challan },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/challan/generate error:", err);
    const status = err.statusCode || 500;
    const message = err.statusCode === 404 ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status });
  }
}

