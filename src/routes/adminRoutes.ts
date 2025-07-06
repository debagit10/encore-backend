import { Router } from "express";
import {
  createAdmin,
  loginAdmin,
  getAllAdmins,
  updateAdmin,
  suspendAdmin,
  reinstateAdmin,
  deleteAdmin,
  changePassword,
  forgotPassword,
  verifyForgotPassword,
} from "../controllers/adminControllers";

export const adminRoutes = Router();

adminRoutes.post("/create", createAdmin);
adminRoutes.post("/login", loginAdmin);
adminRoutes.post("/forgot-password", forgotPassword);
adminRoutes.post("/verify-forgotPassword/:adminId", verifyForgotPassword);

adminRoutes.get("/all", getAllAdmins);

adminRoutes.put("/update/:adminId", updateAdmin);
adminRoutes.put("/suspend/:adminId", suspendAdmin);
adminRoutes.put("/reinstate/:adminId", reinstateAdmin);
adminRoutes.put("/change-password/:adminId", changePassword);

adminRoutes.delete("/delete/:adminId", deleteAdmin);
