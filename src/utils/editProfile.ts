import { Response, Request } from "express";
import Admin from "../models/adminModel";
import { adminServices } from "../services/adminServices";
import { passwordServices } from "./password";

interface UpdatedData {
  first_name?: string;
  last_name?: string;
  email?: string;
  password: string; // current password for verification
}

export const updateProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { password, ...updates } = req.body as UpdatedData;

  try {
    const { data } = await adminServices.getAdminById(userId);

    if (!data) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    const verify = await passwordServices.verifyPassword(
      password,
      data.password
    );

    if (!verify) {
      res.status(401).json({ error: "Current password is incorrect" });
      return;
    }

    if (updates.email) {
      const existing = await adminServices.adminExists(updates.email);

      if (existing.success) {
        res.status(409).json({ error: "Email already exists" });
        return;
      }
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedAdmin,
    });
    return;
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
