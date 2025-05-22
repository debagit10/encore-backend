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

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body as AdminData;

  try {
    const existingAdmin = await adminServices.adminExists(email);

    if (!existingAdmin.success || !existingAdmin.data) {
      res.status(400).json({
        success: false,
        message: existingAdmin.message || "Admin not found",
      });
      return;
    }

    const admin = existingAdmin.data;

    if (admin.suspended) {
      res.status(403).json({
        success: false,
        message: "Admin account is suspended",
      });
      return;
    }

    const isPasswordValid = await passwordServices.verifyPassword(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    const { password: _, ...adminSafe } = admin.toObject(); // Exclude password from response

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: adminSafe,
    });
    return;
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const getAllAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await adminServices.getAllAdmins();

    if (!admins.success) {
      res.status(400).json(admins);
      return;
    }

    res.status(200).json(admins);
    return;
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const adminData: AdminData = req.body;

  try {
    const result = await adminServices.updateAdmin(adminId, adminData);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
    return;
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.params;

  try {
    const result = await adminServices.deleteAdmin(adminId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
    return;
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const suspendAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.params;

  try {
    const result = await adminServices.suspendAdmin(adminId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
    return;
  } catch (error) {
    console.error("Error suspending admin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const reinstateAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.params;

  try {
    const result = await adminServices.reinstateAdmin(adminId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
    return;
  } catch (error) {
    console.error("Error reinstating admin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const { newPassword } = req.body;

  try {
    const result = await adminServices.changePassword(
      adminId,
      await passwordServices.hashPassword(newPassword)
    );

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
    return;
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
