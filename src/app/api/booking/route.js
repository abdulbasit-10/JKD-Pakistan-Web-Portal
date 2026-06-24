import { connectDB } from "@/lib/dbConnect";
import Booking from "@/models/bookModel";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    const fileFields = ["idImage", "paymentScreenshot"];
    console.log("FormData received:", data);

    let idImageUrl = null;
    let paymentScreenshotUrl = null;

    for (const field of fileFields) {
      const file = formData.get(field);
      if (file && typeof file === "object") {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = buffer.toString("base64");
        const filename = `data:${file.type};base64,${base64}`;
        const result = await uploadImageToCloudinary(filename);
        field === "idImage" ? idImageUrl = result.secure_url: paymentScreenshotUrl = result.secure_url;
      }
    }
    const { fullName, email, phoneNumber, province, district, tehsil, organization, prefferedDate, prefferedTime, emergencyContact, medical , signatureName, eventFee, paymentMethod , userId}= data;
    console.log(fullName, email, phoneNumber, province, district, tehsil, organization, prefferedDate, prefferedTime, emergencyContact, medical , signatureName, eventFee, paymentMethod , idImageUrl , paymentScreenshotUrl)
    const booking = new Booking({
      fullName, email, phoneNumber, province, district, tehsil, organization, prefferedDate, prefferedTime, emergencyContact, medical , signatureName, eventFee, paymentMethod , idImageUrl , paymentScreenshotUrl
    });
    await booking.save();
    console.log(booking);

    return NextResponse.json({
        success: true,
        message: "Booking created successfully",
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({
        success: false,
        error: error.message || "Something went wrong while creating booking",
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();    
    const token = request.headers.get("x-user-token");
    const decoded =token && jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(decoded);
    if (!decoded?.sub || !decoded?.email) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const applications = await Booking.find().populate('userId');;
    // console.log("Fetched bookings:", applications);
    
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error("GET /api/booking error:", error);
    return NextResponse.json(
      {error: "Server error", detail: error.message},
      {status: 500}
    );  
  }
}