import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Challan from "@/models/challanModel";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const challan = await Challan.findOne({ applicationId: id }).populate("applicationId");

    if (!challan) {
      return NextResponse.json({ success: false, error: "Challan not found" }, { status: 404 });
    }

    // ✅ Ownership check — sirf apni khud ki challan dekh sake (ya admin)
    const requestUserId = request.headers.get("x-user-id");
    const requestUserRole = request.headers.get("x-user-role");
    const ownerUserId = challan.applicationId?.userId?.toString();

    const isOwner = ownerUserId && ownerUserId === requestUserId;
    const isAdmin = requestUserRole === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ success: true, challan }, { status: 200 });
  } catch (error) {
    console.error("Error fetching challan:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
