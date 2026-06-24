import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Apply from "@/models/applyModel";
import Challan from "@/models/challanModel";
import jwt from "jsonwebtoken";
import Counter from "@/models/regCountModel";

export async function POST(request) {
  try {
    await connectDB();

    const { applicationId } = await request.json();

    // Fetch application
    const application = await Apply.findById(applicationId);

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Challan Counter
    const counter = await Counter.findOneAndUpdate(
      { name: "challan" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Receipt Counter
    const receiptCounter = await Counter.findOneAndUpdate(
      { name: "receipt" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const regNo = counter.seq.toString().padStart(2, "0");
    const receiptNo = `REC-${receiptCounter.seq
      .toString()
      .padStart(4, "0")}`;

    const feeStructure = [
      { label: "Registration Fee", amount: 2000 },
      { label: `${application.chooseCourse} Course Fee`, amount: 15000 },
      { label: "Service Charges", amount: 1500 },
    ];

    const totalAmount = feeStructure.reduce(
      (sum, f) => sum + f.amount,
      0
    );

    // Create challan
    const challan = new Challan({
      applicationId,
      regNo,
      receiptNo,
      date: new Date().toISOString().slice(0, 10),
      particulars: feeStructure,
      totalAmount,
      balance: 0,
    });

    await challan.save();

    return NextResponse.json(
      {
        message: "Challan generated successfully",
        challan,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}