"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const adminServices_1 = require("../services/adminServices");
const password_1 = require("./password");
const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { password, ...updates } = req.body;
    try {
        const { data } = await adminServices_1.adminServices.getAdminById(userId);
        if (!data) {
            res.status(404).json({ error: "Admin not found" });
            return;
        }
        const verify = await password_1.passwordServices.verifyPassword(password, data.password);
        if (!verify) {
            res.status(401).json({ error: "Current password is incorrect" });
            return;
        }
        if (updates.email) {
            const existing = await adminServices_1.adminServices.adminExists(updates.email);
            if (existing.success) {
                res.status(409).json({ error: "Email already exists" });
                return;
            }
        }
        const updatedAdmin = await adminModel_1.default.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
        }).select("-password");
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedAdmin,
        });
        return;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.updateProfile = updateProfile;
