import { connectDB } from "@/lib/dbConnect";
import Apply from "@/models/applyModel";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        await connectDB();
        const formData = await request.formData();
        const applicationId = formData.get("applicationId");
        const challanImage = formData.get("challanImage");
        let challanImageUrl = null;
        console.log("challan image" , challanImage);

        if (!applicationId || !challanImage) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (challanImage && typeof challanImage !== "string") {
            const arrayBuffer = await challanImage.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64 = buffer.toString("base64");
            const dataUri = `data:${challanImage.type};base64,${base64}`;

            const result = await uploadImageToCloudinary(dataUri);
            challanImageUrl = result.secure_url;
        }   
        if (!challanImageUrl) {
            return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
        }
        const updatedApplication = await Apply.findByIdAndUpdate(
            applicationId,
            { $set: { challanUrl: challanImageUrl } }, 
            { new: true, runValidators: true }
        );

        if (!updatedApplication) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Challan uploaded successfully", application: updatedApplication }, { status: 200 });


    }catch(error){
        console.log("api/challan/upload",error);
        return  NextResponse.json({error: 'Failed to upload challan', details: error.message}, {status: 500});
    }
}