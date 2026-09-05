import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { connectDB } from "@/lib/dbConnect";
import { isValidEmail, isValidPassword, isValidUsername } from "@/lib/validators";

export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { userName, email, password, confirmPassword } = reqBody;

        if(!userName || !email || !password || !confirmPassword){
          return NextResponse.json({message:"All fields are required"},{status:400})
        }

        // ✅ Regex validation
        if (!isValidUsername(userName)) {
          return NextResponse.json({message:"Username must be 3-30 characters (letters, numbers, underscore only)"},{status:400})
        }

        if (!isValidEmail(email)) {
          return NextResponse.json({message:"Invalid email address"},{status:400})
        }

        if (!isValidPassword(password)) {
          return NextResponse.json({message:"Password must be at least 6 characters"},{status:400})
        }

        if(password !== confirmPassword){
          return NextResponse.json({message:"Passwords did not match"},{status:400})
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return NextResponse.json({message:"User already exists"},{status:400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            role: "student",
        })

        await newUser.save();

        return NextResponse.json(
          {
            success: true,
            message: "Signup successful! Please login to continue.",
          },
          { status: 201, headers: { "Cache-Control": "no-store" } }
        );

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Something went wrong"},{status:500})
    }
}
