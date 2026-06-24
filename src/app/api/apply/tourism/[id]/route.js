import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import TourismApplication from "@/models/tourismApplicationModel";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid application ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    // Validate status
    if (!["Pending", "Confirmed", "Approved", "Rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Allowed values: Pending, Confirmed, Approved, Rejected" },
        { status: 400 }
      );
    }

    // Update the application
    const updatedApplication = await TourismApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedApplication) {
      return NextResponse.json(
        { error: "Tourism application not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Status updated successfully.",
        application: updatedApplication,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/apply/tourism/[id] error:", error);
    return NextResponse.json(
      { error: "Unable to update application.", detail: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid application ID." },
        { status: 400 }
      );
    }

    const application = await TourismApplication.findById(id);

    if (!application) {
      return NextResponse.json(
        { error: "Tourism application not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    console.error("GET /api/apply/tourism/[id] error:", error);
    return NextResponse.json(
      { error: "Unable to fetch application.", detail: error.message },
      { status: 500 }
    );
  }
}
