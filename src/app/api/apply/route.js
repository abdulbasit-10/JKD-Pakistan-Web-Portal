import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Apply from "@/models/applyModel";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import jwt from 'jsonwebtoken';
import "@/models/userModel"; // Ensure User model is registered for population
import { isValidName, isValidEmail, isValidPhone, isValidCNIC, validateFile } from "@/lib/validators";
import { generateChallan } from "@/lib/generateChallan"; // ✅ Naya import — axiosInstance ki jagah

export async function POST(request) {
  try {
    await connectDB();

    // Extract userId from JWT token in cookies
    let authenticatedUserId = null;
    const cookies = request.cookies;
    const token = cookies.get('token')?.value;

    if (token && process.env.TOKEN_SECRET) {
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        authenticatedUserId = decoded.sub || decoded.id || decoded._id;
      } catch (tokenError) {
        console.log('Token decode failed (non-authenticated user):', tokenError.message);
      }
    }

    const formData = await request.formData();
    const {
      userId: formUserId,
      name,
      fatherName,
      gender,
      email,
      dateOfBirth,
      whatsappNumber,
      phoneNumber,
      CNIC,
      parentsCNIC,
      province,
      district,
      tehsil,
      chooseCourse,
      passport,
      CNICPicture,
      qualification,
      passportSizePic,
    } = Object.fromEntries(formData);

    if (
      !name || !fatherName || !email || !dateOfBirth || !gender ||
      !whatsappNumber || !phoneNumber || !CNIC || !parentsCNIC ||
      !province || !district || !tehsil || !chooseCourse ||
      !CNICPicture || !qualification || !passportSizePic
    ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // ✅ Regex validation
    if (!isValidName(name) || !isValidName(fatherName)) {
      return NextResponse.json({ error: "Names must be valid (letters only, 2-80 chars)" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!isValidPhone(whatsappNumber) || !isValidPhone(phoneNumber)) {
      return NextResponse.json({ error: "Phone numbers must be 10-15 digits" }, { status: 400 });
    }
    if (!isValidCNIC(CNIC) || !isValidCNIC(parentsCNIC)) {
      return NextResponse.json({ error: "CNIC must be a valid 13-digit number" }, { status: 400 });
    }

    // ✅ File validation — .txt aur invalid file types reject
    const filesToCheck = [CNICPicture, qualification, passportSizePic, passport];
    for (const file of filesToCheck) {
      if (file && typeof file !== "string") {
        const result = validateFile(file);
        if (!result.valid) {
          return NextResponse.json({ error: result.error }, { status: 400 });
        }
      }
    }

    let CNICPictureUrl = null;
    let passportSizePicUrl = null;
    let qualificationUrl = null;
    let passportUrl = null;

    if (CNICPicture && typeof CNICPicture !== "string") {
      const arrayBuffer = await CNICPicture.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${CNICPicture.type};base64,${base64}`;
      const result = await uploadImageToCloudinary(dataUri);
      CNICPictureUrl = result.secure_url;
    }

    if (passportSizePic && typeof passportSizePic !== "string") {
      const arrayBuffer = await passportSizePic.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${passportSizePic.type};base64,${base64}`;
      const result = await uploadImageToCloudinary(dataUri);
      passportSizePicUrl = result.secure_url;
    }

    if (qualification && typeof qualification !== "string") {
      const arrayBuffer = await qualification.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${qualification.type};base64,${base64}`;
      const result = await uploadImageToCloudinary(dataUri);
      qualificationUrl = result.secure_url;
    }

    if (passport && typeof passport !== "string") {
      const arrayBuffer = await passport.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${passport.type};base64,${base64}`;
      const result = await uploadImageToCloudinary(dataUri);
      passportUrl = result.secure_url;
    }

    const finalUserId = authenticatedUserId || formUserId || null;

    const newApplication = new Apply({
      name,
      userId: finalUserId,
      fatherName,
      email,
      dateOfBirth,
      gender,
      whatsappNumber,
      phoneNumber,
      CNIC,
      parentsCNIC,
      province,
      district,
      tehsil,
      chooseCourse,
      CNICPictureUrl,
      qualificationUrl,
      passportSizePicUrl,
      passportUrl,
    });

    await newApplication.save();

    // ✅ Ab direct function call — koi HTTP request nahi, cookie/auth ka masla khatam
    let challan;
    try {
      challan = await generateChallan(newApplication._id);
    } catch (challanError) {
      console.error("Challan generation failed:", challanError);
      return NextResponse.json(
        { error: "Application saved but challan generation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application: newApplication,
        challan,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/apply error:", err);

    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      let userMessage = "An application with this information already exists.";
      if (field === "email") {
        userMessage = "An application with this email has already been submitted. Please use a different email address.";
      } else if (field === "CNIC") {
        userMessage = "An application with this CNIC has already been submitted. Please contact support if you believe this is an error.";
      }
      return NextResponse.json({ error: userMessage }, { status: 409 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const token = request.headers.get("x-user-token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (process.env.TOKEN_SECRET) {
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      } catch (jwtError) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
      }

      if (!decoded.sub || !decoded.email) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }

    const applications = await Apply.find().populate('userId').sort({ createdAt: -1 });
    return NextResponse.json(applications, { status: 200 });
  } catch (err) {
    console.error("GET /api/apply error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
