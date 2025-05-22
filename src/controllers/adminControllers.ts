import { Request, Response } from "express";
import { adminServices } from "../services/adminServices";
import { otpServices } from "../utils/otp";
import { passwordServices } from "../utils/password";

interface AdminData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const createAdmin = async (req: Request, res: Response) => {
  const adminData: AdminData = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await adminServices.adminExists(adminData.email);

    if (existingAdmin.success) {
      res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
      return;
    }

    // Create the new admin
    const result = await adminServices.addAdmin({
      ...adminData,
      password: await passwordServices.hashPassword(adminData.password),
      suspended: false,
      deleted: false,
    });

    if (result.success) {
      res.status(201).json({ ...result, otp: otpServices.generateOtp() });
      return;
    }

    res.status(400).json(result);
    return;
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
