import mongoose from "mongoose";

interface IOtp {
  user_id: string;
  otp: string;
  used: boolean;
  expiresAt: Date;
  createdAt: Date;
}

const otpSchema = new mongoose.Schema<IOtp>(
  {
    user_id: { type: String, required: true },
    otp: { type: String, required: true },
    used: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const OTP = mongoose.model("OTP", otpSchema);
