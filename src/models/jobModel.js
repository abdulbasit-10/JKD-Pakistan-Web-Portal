import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    // Personal Details
    fullName: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    whatsappNumber: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
    fatherCnic: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },

    // Applicant Address
    province: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    tehsil: {
        type: String,
        required: true,
    },

    // Preferred Course & Payment
    appliedPosition: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },

    // Documents
    cnicPicture: {
        type: String,
    },
    latestQualificationPicture: {
        type: String,
    },
    passportSizePhotograph: {
        type: String,
    },
    paidChallanFile: {
        type: String,
    },
    resumeUrl: {
        type: String,
        required: true,
    },

    // Optional fields (kept for backward compatibility)
    linkedinProfile: {
        type: String,
    },
    portfolio: {
        type: String,
    },
    coverLetter: {
        type: String,
    },
    currentJobTitle: {
        type: String,
    },
    totalExperience: {
        type: Number,
    },
    expectedSalary: {
        type: String,
    },
    availability: {
        type: String,
    },
    preferredWorkType: {
        type: String,
    },
}, { timestamps: true });

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;