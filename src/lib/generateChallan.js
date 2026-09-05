import Apply from "@/models/applyModel";
import Challan from "@/models/challanModel";
import Counter from "@/models/regCountModel";

export async function generateChallan(applicationId) {
  const application = await Apply.findById(applicationId);

  if (!application) {
    const notFoundError = new Error("Application not found");
    notFoundError.statusCode = 404;
    throw notFoundError;
  }

  const counter = await Counter.findOneAndUpdate(
    { name: "challan" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const receiptCounter = await Counter.findOneAndUpdate(
    { name: "receipt" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const regNo = counter.seq.toString().padStart(2, "0");
  const receiptNo = `REC-${receiptCounter.seq.toString().padStart(4, "0")}`;

  const feeStructure = [
    { label: "Registration Fee", amount: 2000 },
    { label: `${application.chooseCourse} Course Fee`, amount: 15000 },
    { label: "Service Charges", amount: 1500 },
  ];

  const totalAmount = feeStructure.reduce((sum, f) => sum + f.amount, 0);

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

  return challan;
}

