import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Job from "@/models/jobModel";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { isValidName, isValidEmail, isValidPhone, validateFile } from "@/lib/validators";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const {
      fullName,
      email,
      contactNumber,
      location,
      currentJobTitle,
      appliedPosition,
      totalExperience,
      linkedinProfile,
      portfolio,
      coverLetter,
      // ✅ Comment kiye — frontend ye fields bhejta hi nahi
      // fatherName, gender, whatsappNumber, cnic, fatherCnic, dateOfBirth,
      // province, district, tehsil, paymentMethod,
    } = Object.fromEntries(formData);

    // ✅ File field ka naam frontend se match karaya: "resume" (pehle "resumeUrl" tha)
    const resumeFile = formData.get("resume");

    // ✅ Sirf wahi fields required jo frontend actually bhejta hai
    if (!fullName || !email || !contactNumber || !appliedPosition || !resumeFile) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    // ✅ Regex validation
    if (!isValidName(fullName)) {
      return NextResponse.json({ error: "Name must be valid (letters only, 2-80 chars)" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!isValidPhone(contactNumber)) {
      return NextResponse.json({ error: "Contact number must be 10-15 digits" }, { status: 400 });
    }

    // ✅ File validation — .txt aur invalid types reject
    const fileCheck = validateFile(resumeFile);
    if (!fileCheck.valid) {
      return NextResponse.json({ error: fileCheck.error }, { status: 400 });
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

    const newApplication = new Job({
      fullName,
      email,
      contactNumber,
      location,
      currentJobTitle,
      appliedPosition,
      totalExperience: totalExperience ? Number(totalExperience) : undefined,
      linkedinProfile,
      portfolio,
      coverLetter,
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

