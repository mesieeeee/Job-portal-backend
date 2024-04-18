import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name!"],
        minLength: [4, "name nust contain at least 4 characters"],
        maxLength: [32, "name cannot exceed 32 characters"],
    },
    email: {
        type: String,
        required: [true, "please provide your email"],
        validate: [validator.isEmail, 'PLease provide a valid email id'],
    },
    phone: {
        type: Number,
        required: [true, "please provide your phone number"],
    },
    password: {
        type:String,
        required: [true, "please provide your password"],
        minLength:[4, "password nust contain at least 4 characters"],
        maxLength: [32, "password cannot exceed 32 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: ["Job Seeker", "Employer"],
        required: [true, "please provide your role"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.JWTToken = function(){
    return jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);