import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Booking from "@/models/bookModel";

const ALLOWED_STATUSES = ["Pending", "Confirmed", "Approved", "Rejected"];

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ error: "Status field is required" }, { status: 400 });
    }

    // ✅ Sirf allowed values accept honi chahiye
    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Status updated successfully", Booking: updatedBooking },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT /api/booking/[id] error:", err);
    // ⚠️ err.message user ko expose nahi karna chahiye production mein
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Booking deleted successfully",
        booking: deletedBooking, // ✅ fixed: pehle 'deletedApplication' tha jo exist hi nahi karta tha
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/booking/[id] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
