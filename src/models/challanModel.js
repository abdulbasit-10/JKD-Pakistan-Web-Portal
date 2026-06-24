import mongoose from "mongoose";

const challanSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apply",
    required: true,
  },
  receiptNo: {
  type: String,
  required: true,
  unique: true,
},
  regNo: String,
  date: String,
  particulars: [
    {
      label: String,
      amount: Number,
    },
  ],
  totalAmount: Number,
  balance: Number,
}, { timestamps: true });

export default mongoose.models.Challan || mongoose.model("Challan", challanSchema);
