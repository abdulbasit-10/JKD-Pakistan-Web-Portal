import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Job from "@/models/jobModel";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

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

    const cnicPictureFile = formData.get("cnicPicture");
    const latestQualificationPictureFile = formData.get("latestQualificationPicture");
    const passportSizePhotographFile = formData.get("passportSizePhotograph");
    const paidChallanFileFile = formData.get("paidChallanFile");
    const resumeFile = formData.get("resumeUrl");

    if (
      !fullName || !fatherName || !email || !gender || !whatsappNumber ||
      !contactNumber || !cnic || !fatherCnic || !dateOfBirth || !province ||
      !district || !tehsil || !appliedPosition || !paymentMethod || !resumeFile
    ) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    // ✅ Har uploaded file ka type/size validate karo
    const filesToCheck = [
      cnicPictureFile, latestQualificationPictureFile,
      passportSizePhotographFile, paidChallanFileFile, resumeFile,
    ];
    for (const file of filesToCheck) {
      if (file && typeof file !== "string") {
        if (!ALLOWED_TYPES.includes(file.type)) {
          return NextResponse.json(
            { error: "Only JPG, PNG, WEBP or PDF files are allowed" },
            { status: 400 }
          );
        }
        if (file.size > MAX_SIZE_BYTES) {
          return NextResponse.json(
            { error: "Each file must be under 5MB" },
            { status: 400 }
          );
        }
      }
    }

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

    const newApplication = new Job({
      fullName, fatherName, email, gender, whatsappNumber, contactNumber,
      cnic, fatherCnic, dateOfBirth: new Date(dateOfBirth),
      province, district, tehsil, appliedPosition, paymentMethod,
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
      const userMessage = field === "email"
        ? "An application with this email has already been submitted."
        : "An application with this information already exists.";
      return NextResponse.json({ error: userMessage }, { status: 409 });
    }

    // ⚠️ err.message hataya — internal details expose nahi karni
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const applications = await Job.find();
    return NextResponse.json({ data: applications }, { status: 200 });
  } catch (err) {
    console.error("GET /api/apply/job error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
