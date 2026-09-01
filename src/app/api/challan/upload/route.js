import { connectDB } from "@/lib/dbConnect";
import Apply from "@/models/applyModel";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(request) {
    try {
        await connectDB();
        const formData = await request.formData();
        const applicationId = formData.get("applicationId");
        const challanImage = formData.get("challanImage");

        if (!applicationId || !challanImage) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (typeof challanImage === "string") {
            return NextResponse.json({ error: "Invalid file" }, { status: 400 });
        }

        // ✅ File type validate
        if (!ALLOWED_TYPES.includes(challanImage.type)) {
            return NextResponse.json({ error: "Only JPG, PNG, WEBP or PDF files allowed" }, { status: 400 });
        }

        // ✅ File size validate
        if (challanImage.size > MAX_SIZE_BYTES) {
            return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });
        }

        // ✅ Ownership check — sirf apni application ka challan upload kar sake
        const application = await Apply.findById(applicationId);
        if (!application) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        const requestUserId = request.headers.get("x-user-id");
        const requestUserRole = request.headers.get("x-user-role");
        if (requestUserRole !== "admin" && application.userId?.toString() !== requestUserId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const arrayBuffer = await challanImage.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const dataUri = `data:${challanImage.type};base64,${base64}`;

        const result = await uploadImageToCloudinary(dataUri);
        const challanImageUrl = result.secure_url;

        if (!challanImageUrl) {
            return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
        }

        const updatedApplication = await Apply.findByIdAndUpdate(
            applicationId,
            { $set: { challanUrl: challanImageUrl } },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ message: "Challan uploaded successfully", application: updatedApplication }, { status: 200 });

    } catch (error) {
        console.error("api/challan/upload", error);
        return NextResponse.json({ error: "Failed to upload challan" }, { status: 500 });
    }
}

