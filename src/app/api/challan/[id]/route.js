import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Challan from "@/models/challanModel";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; 
    const challan = await Challan.findOne({ applicationId : id }).populate("applicationId");
    // console.log("Fetched challan:", challan);
    if (!challan) {
      return NextResponse.json(
        { success: false, error: "Challan not found" },
        { status: 404 }
      );  
    }
    return NextResponse.json(
      {
        success: true,  
        challan,
        // application,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching challan:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
