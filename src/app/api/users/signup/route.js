import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { connectDB } from "@/lib/dbConnect";

export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { userName, email, password, confirmPassword } = reqBody;

        if(!userName || !email || !password || !confirmPassword){
          return NextResponse.json({message:"All fields are required"},{status:400})
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

        // ✅ Ab yahan koi token generate/cookie set nahi ho rahi
        // User ko sirf success message milega, login khud se karna hoga

        return NextResponse.json(
          {
            success: true,
            message: "Signup successful! Please login to continue.",
          },
          { status: 201, headers: { "Cache-Control": "no-store" } }
        );

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error.message || "Something went wrong"},{status:500})
    }
}

