"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpServices = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const otpModel_1 = require("../models/otpModel");
const generateOtp = () => {
    return otp_generator_1.default.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
    });
};
const storeOtp = async (user_id, otp) => {
    const expiresIn = 5 * 60 * 1000; // 5 minutes
    const expiresAt = new Date(Date.now() + expiresIn);
    await otpModel_1.OTP.create({
        user_id,
        otp,
        expiresAt,
        used: false,
    });
    return {
        success: true,
        message: "OTP stored successfully",
    };
};
const verifyOtp = async (user_id, otp) => {
    try {
        const otpEntry = await otpModel_1.OTP.findOne({
            user_id,
            otp,
        });
        if (!otpEntry) {
            return { success: false, message: "Invalid OTP" };
        }
        if (otpEntry.used) {
            return { success: false, message: "OTP already used" };
        }
        if (new Date() > otpEntry.expiresAt) {
            return { success: false, message: "OTP expired" };
        }
        // Mark OTP as used
        otpEntry.used = true;
        await otpEntry.save();
        return { success: true, message: "OTP verified successfully" };
    }
    catch (error) {
        console.error("OTP verification error:", error);
        return { success: false, message: "Server error during OTP verification" };
    }
};
exports.otpServices = {
    generateOtp,
    storeOtp,
    verifyOtp,
};
