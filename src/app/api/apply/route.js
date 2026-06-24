import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Apply from "@/models/applyModel";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import jwt from 'jsonwebtoken'
import axiosInstance from "@/lib/axios";
import  "@/models/userModel"; // Ensure User model is registered for population

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
    
    // const form = await request.json(); 
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
      // const name = formData.get("name");  
      // const fatherName = formData.get("fatherName");
      // const gender = formData.get("gender");
      // const email = formData.get("email");
      // const dateOfBirth = formData.get("dateOfBirth");
      // const whatsappNumber = formData.get("whatsappNumber");
      // const phoneNumber = formData.get("phoneNumber");
      // const CNIC = formData.get("CNIC");
      // const parentsCNIC = formData.get("parentsCNIC");
      // const province = formData.get("province"); 
      // const district = formData.get("district");
      // const tehsil = formData.get("tehsil");
      // const chooseCourse = formData.get("chooseCourse");
      // const passport = formData.get("passport");
      // const CNICPicture = formData.get("CNICPicture");
      // const qualification = formData.get("qualification");
      // const passportSizePic = formData.get("passportSizePic");


    // console.log( name , gender , email , dateOfBirth , whatsappNumber , phoneNumber , CNIC , parentsCNIC , province , district , tehsil , chooseCourse ,CNICPicture , qualification , passportSizePic);

    // const userId = request.headers.get("x-user-id");
    // const userEmail = request.headers.get("x-user-email");
    // const userRole = request.headers.get("x-user-role");
    // console.log("userId" , userId , userEmail , userRole);

    if (
      !name ||
      !fatherName ||
      !email ||
      !dateOfBirth ||
      !gender ||
      !whatsappNumber ||
      !phoneNumber ||
      !CNIC ||
      !parentsCNIC || 
      !province ||
      !district ||
      !tehsil ||
      !chooseCourse ||
      !CNICPicture ||
      !qualification ||
      !passportSizePic 
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

let CNICPictureUrl = null;
let passportSizePicUrl = null;
let qualificationUrl=null;
let passportUrl=null;


// ✅ Upload CNIC Picture
if (CNICPicture && typeof CNICPicture !== "string") {
  const arrayBuffer = await CNICPicture.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUri = `data:${CNICPicture.type};base64,${base64}`;

  const result = await uploadImageToCloudinary(dataUri);
  CNICPictureUrl = result.secure_url;
}

// ✅ Upload Passport Size Pic
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
console.log(CNICPictureUrl , qualificationUrl , passportSizePicUrl , passportUrl );


    // const existing = await Apply.findOne({
    //   $or: [{ email }, { CNIC }],
    // });
    // if (existing) {
    //   return NextResponse.json(
    //     { error: "User with this email or CNIC already exists" },
    //     { status: 409 }
    //   );
    // }
    console.log(email)

    // Use authenticated userId if available, otherwise use form userId
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
      passportUrl
    });

    await newApplication.save();

    // Call challan generate API internally
    const challanResponse = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/challan/generate`, { applicationId: newApplication._id }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const challanData = await challanResponse.data;

    if (challanResponse.status !== 201) {
      return NextResponse.json(
        { error: "Application saved but challan generation failed", challanData },
        { status: 500 }
      );
    }


    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application: newApplication,
        challan: challanData.challan,
        // requestedBy: { userId, userEmail, userRole },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/apply error:", err);
    
    // Handle MongoDB duplicate key error (E11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      let userMessage = "An application with this information already exists.";
      
      if (field === "email") {
        userMessage = "An application with this email has already been submitted. Please use a different email address.";
      } else if (field === "CNIC") {
        userMessage = "An application with this CNIC has already been submitted. Please contact support if you believe this is an error.";
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
    const token = request.headers.get("x-user-token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT only when secret is configured; otherwise rely on middleware token gate.
    if (process.env.TOKEN_SECRET) {
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      } catch (jwtError) {
        return NextResponse.json(
          { error: "Invalid or expired token" },
          { status: 401 }
        );
      }

      if (!decoded.sub || !decoded.email) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }

    const applications = await Apply.find().populate('userId').sort({ createdAt: -1 });
    // console.log("Fetched applications:", applications);
    return NextResponse.json(applications, { status: 200 });
  } catch (err) {
    console.error("GET /api/apply error:", err);
    return NextResponse.json(
      {error: "Server error", detail: err.message},
      {status: 500}
    );
  }
  }