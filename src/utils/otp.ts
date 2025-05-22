import otpGenerator from "otp-generator";
import { OTP } from "../models/otpModel";

const generateOtp = () => {
  return otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
};

const storeOtp = async (user_id: string, otp_code: string) => {
  const expiresIn = 5 * 60 * 1000; // 5 minutes
  const expiresAt = new Date(Date.now() + expiresIn);

  await OTP.create({
    user_id,
    otp_code,
    expiresAt,
    used: false,
  });

  return {
    success: true,
    message: "OTP stored successfully",
  };
};

const verifyOtp = async (user_id: string, otp_code: string) => {
  try {
    const otpEntry = await OTP.findOne({
      where: { user_id, otp_code },
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
  } catch (error) {
    console.error("OTP verification error:", error);
    return { success: false, message: "Server error during OTP verification" };
  }
};

export const otpServices = {
  generateOtp,
  storeOtp,
  verifyOtp,
};
