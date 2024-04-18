import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide your job title"],
        minLength: [4, "job title must contain at least 4 characters"],
        maxLength: [32, "job title must not exceed 32 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide your description"],
        minLength: [15, "description must contain at least 15 characters"],
        maxLength: [50, "description must not exceed 50 characters"],
    },
    category: {
        type: String,
        required: [true, "Job category is required"],
    },
    city: {
        type: String,
        required: [true, "Job city is required"],
    },
    location: {
        type: String,
        required: [true, "please provide exact location"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "fixed salary must contain at least 4 digits"],
        maxLength: [10, "Fixed salary must contain at max 10 digits"],
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "salaryFrom must contain at least 4 digits"],
        maxLength: [10, "salaryFrom must contain at max 10 digits"],
    },
    salaryTo: {
        type: Number,
        minLength: [4, "salaryTo must contain at least 4 digits"],
        maxLength: [10, "salaryTo must contain at max 10 digits"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Job = mongoose.model("Job", jobSchema);