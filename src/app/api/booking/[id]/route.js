import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Booking from "@/models/bookModel";


export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    console.log("Updating booking with id:", id);
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status field is required" },
        { status: 400 }
      );
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Status updated successfully",
        Booking: updatedBooking,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT /api/booking/[id] error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
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
      { error: "Internal server error", detail: err.message },
      { status: 500 }
    );
  }
}
