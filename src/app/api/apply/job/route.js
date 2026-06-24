import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Job from "@/models/jobModel";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const {
      fullName,
      fatherName,
      email,
      gender,
      whatsappNumber,
      contactNumber,
      cnic,
      fatherCnic,
      dateOfBirth,
      province,
      district,
      tehsil,
      appliedPosition,
      paymentMethod,
    } = Object.fromEntries(formData);

    // Get file uploads
    const cnicPictureFile = formData.get("cnicPicture");
    const latestQualificationPictureFile = formData.get("latestQualificationPicture");
    const passportSizePhotographFile = formData.get("passportSizePhotograph");
    const paidChallanFileFile = formData.get("paidChallanFile");
    const resumeFile = formData.get("resumeUrl");

    // Validation - all required fields
    if (
      !fullName ||
      !fatherName ||
      !email ||
      !gender ||
      !whatsappNumber ||
      !contactNumber ||
      !cnic ||
      !fatherCnic ||
      !dateOfBirth ||
      !province ||
      !district ||
      !tehsil ||
      !appliedPosition ||
      !paymentMethod ||
      !resumeFile
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Upload files to Cloudinary
    const uploadFile = async (file) => {
      if (!file || typeof file === "string") return null;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      const result = await uploadImageToCloudinary(dataUri);
      return result.secure_url;
    };

    const resumeUrl = await uploadFile(resumeFile);
    const cnicPictureUrl = await uploadFile(cnicPictureFile);
    const latestQualificationPictureUrl = await uploadFile(latestQualificationPictureFile);
    const passportSizePhotographUrl = await uploadFile(passportSizePhotographFile);
    const paidChallanFileUrl = await uploadFile(paidChallanFileFile);

    // Save to MongoDB
    const newApplication = new Job({
      fullName,
      fatherName,
      email,
      gender,
      whatsappNumber,
      contactNumber,
      cnic,
      fatherCnic,
      dateOfBirth: new Date(dateOfBirth),
      province,
      district,
      tehsil,
      appliedPosition,
      paymentMethod,
      cnicPicture: cnicPictureUrl,
      latestQualificationPicture: latestQualificationPictureUrl,
      passportSizePhotograph: passportSizePhotographUrl,
      paidChallanFile: paidChallanFileUrl,
      resumeUrl,
    });

    await newApplication.save();

    return NextResponse.json(
      { message: "Application submitted successfully", application: newApplication },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/apply/job error:", err);
    
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      let userMessage = "An application with this information already exists.";
      
      if (field === "email") {
        userMessage = "An application with this email has already been submitted. Please use a different email address.";
      }
      
      return NextResponse.json(
        { error: userMessage },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: "Server error", detail: err.message },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  try {
    await connectDB(); 

    const applications = await Job.find();

    return NextResponse.json(
      {
        data: applications,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/apply/job error:", err);
    return NextResponse.json(
      { error: "Server error", detail: err.message },
      { status: 500 }
    );
  }
}