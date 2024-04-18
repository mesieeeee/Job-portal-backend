import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import { sendtoken } from "../utils/jwtTokens.js";

export const register = catchAsyncError(async(req, res, next) => {
    const {name, email, phone, role, password} = req.body;
    if(!name|| !email || !phone || !role || !password){
        return next(new ErrorHandler("please fill full registration form"));
    } 
    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("Email already exits!"));
    }
    const user = await User.create({
        name, email, phone, role, password,
    });
    sendtoken(user, 200, res, "User Registered Successfully!");
});

export const login = catchAsyncError(async(req, res, next) => {
    const {email, password, role} = req.body;
    if(!email || !role || !password){
        return next(new ErrorHandler("please provide email, password, and role", 400)
        );
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(
            new ErrorHandler("Invalid Email or Password", 400)
        );
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(
            new ErrorHandler("Invalid Password", 400)
        );
    }
    if(user.role !== role){
        return next(
            new ErrorHandler("User with this role not found", 400)
        );
    }
    sendtoken(user, 200, res, "User logged in successfully", 400);

});

export const logout = catchAsyncError(async(req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expiresIn: new Date(Date.now()),
    }).json({
        success: true,
        message: "User logged out successfully",
    });
});
