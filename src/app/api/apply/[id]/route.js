import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Apply from "@/models/applyModel";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params; // Get the application ID from URL
    const { status } = await request.json(); // Get status from request body

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    // Find the application by ID and update the status
    const updatedApplication = await Apply.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return the updated document
    );

    console.log("Updated Application: ", updatedApplication);

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
    return NextResponse.json(
      { error: "Server error", detail: err.message },
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
      { error: "Server error", detail: err.message },
      { status: 500 }
    );
  }
}
