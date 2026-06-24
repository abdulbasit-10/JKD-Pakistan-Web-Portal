import User from "@/models/userModel";
import { NextResponse } from "next/server";
// import { sendEmail } from "@/helpers/mailer";
import bcryptjs from 'bcryptjs'
import { connectDB } from "@/lib/dbConnect";
import jwt from "jsonwebtoken";



export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { userName , email , password , confirmPassword  , role} = reqBody;
        // Validation
        console.log(reqBody);
        let defaultRole = "student";

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

        if(role != undefined){
          defaultRole = role
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password , salt);
        
        const newUser= new User({
            userName,
            email,
            password: hashedPassword,
            role : defaultRole
        })

        console.log(newUser);
        await newUser.save();
        
        const token = jwt.sign(
          {
            sub: newUser._id.toString(),
            email: newUser.email,
            role: newUser.role || "user",
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "24h" }
        );
        // await sendEmail({email , emailType:"VERIFY" , userId: savedUser._id})
        const res = NextResponse.json(
          {
            success: true,
            message: "Login Successful!",
            user: {
              id: newUser._id.toString(),
              name: newUser.userName ,
              email: newUser.email,
              role: newUser.role || "user",
              createdAt: newUser.createdAt,
            },
          },
          { status: 201, headers: { "Cache-Control": "no-store" } }
        );

    // ✅ Store JWT securely in cookie
        res.cookies.set("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24, // 1 day
        });

    return res;
        // return NextResponse.json({message : "User regester successfully" , success: true , savedUser},{status:201})

    } catch (error) {
      console.log(error)
        return NextResponse.json({message : error.message || "Something went wrong"},{status:500})
    }
}