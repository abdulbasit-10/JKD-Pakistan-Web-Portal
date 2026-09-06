import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Event from "@/models/eventModel";
import { isValidName, isValidEmail, isValidPhone, isValidText } from "@/lib/validators";

export async function POST(req) {
  try {
    await connectDB();

    const {
      firstName, lastName, email, phoneNumber, eventType,
      cateringService, audioVisual, decorations, eventDateTime,
      paymentMethod, message,
    } = await req.json();

    if (
      !firstName || !lastName || !email || !phoneNumber || !eventType ||
      !cateringService || !audioVisual || !decorations || !eventDateTime || !paymentMethod
    ) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    // ✅ Regex validation
    if (!isValidName(firstName) || !isValidName(lastName)) {
      return NextResponse.json({ error: "Names must be valid (letters only)" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!isValidPhone(phoneNumber)) {
      return NextResponse.json({ error: "Phone number must be 10-15 digits" }, { status: 400 });
    }
    if (message && !isValidText(message, 0, 1000)) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    // ✅ Bas DB mein save — email functionality poori tarah hata di
    const newEvent = new Event({
      firstName, lastName, email, phoneNumber, eventType,
      cateringService, audioVisual, decorations, eventDateTime,
      paymentMethod, message,
    });

    await newEvent.save();

    return NextResponse.json(
      { message: "Your event booking request has been submitted successfully!", success: true, event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event booking:", error);
    return NextResponse.json({ success: false, error: "Failed to submit event booking." }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: events }, { status: 200 });
  } catch (err) {
    console.error("GET /api/events error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
