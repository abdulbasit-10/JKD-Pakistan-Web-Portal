import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import TourismApplication from "@/models/tourismApplicationModel";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    await connectDB();
    const applications = await TourismApplication.find({}).sort({ createdAt: -1 });
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error("GET /api/apply/tourism error:", error);
    return NextResponse.json(
      { error: "Unable to fetch tourism applications.", detail: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const packageId = formData.get("packageId")?.toString().trim();
    const packageTitle = formData.get("packageTitle")?.toString().trim();
    const packageLocation = formData.get("packageLocation")?.toString().trim();
    const packageDuration = formData.get("packageDuration")?.toString().trim();
    const packagePrice = formData.get("packagePrice")?.toString().trim();
    const name = formData.get("name")?.toString().trim();
    const fatherName = formData.get("fatherName")?.toString().trim();
    const cnic = formData.get("cnic")?.toString().trim();
    const phoneNumber = formData.get("phoneNumber")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const numberOfPersons = formData.get("numberOfPersons")?.toString().trim();
    const preferredTravelDate = formData.get("preferredTravelDate")?.toString().trim();
    const applicationDocument = formData.get("applicationDocument");

    if (
      !packageId ||
      !packageTitle ||
      !name ||
      !fatherName ||
      !cnic ||
      !phoneNumber ||
      !email ||
      !numberOfPersons ||
      !preferredTravelDate ||
      !applicationDocument
    ) {
      return NextResponse.json(
        { error: "All fields are required, including the uploaded document." },
        { status: 400 }
      );
    }

    if (!applicationDocument || typeof applicationDocument === "string") {
      return NextResponse.json(
        { error: "Please upload a valid document file." },
        { status: 400 }
      );
    }

    const rawBuffer = await applicationDocument.arrayBuffer();
    const buffer = Buffer.from(rawBuffer);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${applicationDocument.type};base64,${base64}`;

    const uploadResult = await uploadImageToCloudinary(dataUri);

    const newApplication = new TourismApplication({
      packageId,
      packageTitle,
      packageLocation,
      packageDuration,
      packagePrice,
      name,
      fatherName,
      cnic,
      phoneNumber,
      email,
      numberOfPersons,
      preferredTravelDate: new Date(preferredTravelDate),
      applicationDocumentUrl: uploadResult.secure_url,
      documentMimeType: applicationDocument.type,
    });

    await newApplication.save();

    return NextResponse.json(
      {
        message: "Tourism application submitted successfully.",
        application: newApplication,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/apply/tourism error:", error);
    return NextResponse.json(
      { error: "Unable to submit application.", detail: error.message },
      { status: 500 }
    );
  }
}

