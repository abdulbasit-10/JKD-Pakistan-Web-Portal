import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Apply from "@/models/applyModel";

const ALLOWED_STATUSES = ["Pending", "Approved", "Rejected"];

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    // ✅ Sirf allowed values accept honi chahiye — warna koi bhi random status set kar sakta hai
    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updatedApplication = await Apply.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Application status updated successfully",
        application: updatedApplication,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT /api/apply/[id] error:", err);
    // ⚠️ err.message hata diya — internal error details client ko show nahi karni chahiye
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedApplication = await Apply.findByIdAndDelete(id);

    if (!deletedApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Application deleted successfully",
        application: deletedApplication,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/apply/[id] error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

