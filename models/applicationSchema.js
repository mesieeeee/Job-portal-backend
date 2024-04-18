import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name"],
        minLength: [4, "name must contain at least 4 characters"],
        maxLength: [32, "name must contain at least 32 characters"],
    },
    email: {
        type: String,
        required: [true, "please provide your name"],
        validator: [validator.isEmail, "please provide a valid email"],
    },
    coverLetter: {
        type: String,
        required: [true, "please provide your cover letter"]
    },
    phone: {
     type: Number,
     required: [true, "please provide your phone number"],   
    },
    address: {
        type: String,
        required: [true, "please provide your address"],
    },
    resume: {
        public_id: {
            type: String, 
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Job Seeker"],
            required: true
        }
    },
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Employer"],
            required: true
        }

    }
});
export const Application = mongoose.model("Application", applicationSchema);