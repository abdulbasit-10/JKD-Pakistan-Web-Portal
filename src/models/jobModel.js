import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    currentJobTitle: {
        type: String,
        required: true,
    },
    appliedPosition: {
        type: String,
        required: true,
    },
    totalExperience: {
        type: Number,
        required: true,
    },
    resumeUrl: {
        type: String,
        required: true,
    },

    // Status (admin ke liye)
    status: {
        type: String,
        enum: ["NEW", "Contacted", "Selected", "Rejected"],
        default: "NEW",
    },

    // ✅ Ye sab purani/unused fields comment kar di gayi hain — frontend inhe bhejta hi nahi
    // fatherName: { type: String },
    // gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    // whatsappNumber: { type: String },
    // cnic: { type: String },
    // fatherCnic: { type: String },
    // dateOfBirth: { type: Date },
    // province: { type: String },
    // district: { type: String },
    // tehsil: { type: String },
    // paymentMethod: { type: String },
    // cnicPicture: { type: String },
    // latestQualificationPicture: { type: String },
    // passportSizePhotograph: { type: String },
    // paidChallanFile: { type: String },
    // linkedinProfile: { type: String },
    // portfolio: { type: String },
    // coverLetter: { type: String },
}, { timestamps: true });

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;

