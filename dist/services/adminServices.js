"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const adminExists = async (email) => {
    try {
        const admin = await adminModel_1.default.findOne({ email });
        if (!admin) {
            return { success: false, message: "Admin not found" };
        }
        return { success: true, message: "Admin found", data: admin };
    }
    catch (error) {
        console.error("Error checking admin:", error);
        return { success: false, message: "Database error" };
    }
};
const addAdmin = async (adminData) => {
    try {
        const newAdmin = new adminModel_1.default(adminData);
        const savedAdmin = await newAdmin.save();
        return {
            success: true,
            message: "Admin created successfully",
            data: savedAdmin,
        };
    }
    catch (error) {
        console.error("Error creating admin:", error);
        return { success: false, message: "Failed to create admin" };
    }
};
const updateAdmin = async (adminId, updateData) => {
    try {
        const updated = await adminModel_1.default.findByIdAndUpdate(adminId, updateData, {
            new: true,
        });
        if (!updated) {
            return { success: false, message: "Admin not found" };
        }
        return {
            success: true,
            message: "Admin updated successfully",
            data: updated,
        };
    }
    catch (error) {
        console.error("Error updating admin:", error);
        return { success: false, message: "Failed to update admin" };
    }
};
const deleteAdmin = async (adminId) => {
    try {
        const deleted = await adminModel_1.default.findByIdAndDelete(adminId);
        if (!deleted) {
            return { success: false, message: "Admin not found" };
        }
        return {
            success: true,
            message: "Admin deleted successfully",
            data: deleted,
        };
    }
    catch (error) {
        console.error("Error deleting admin:", error);
        return { success: false, message: "Failed to delete admin" };
    }
};
const getAllAdmins = async () => {
    try {
        const admins = await adminModel_1.default.find();
        return {
            success: true,
            message: "Admins fetched successfully",
            data: admins,
        };
    }
    catch (error) {
        console.error("Error fetching admins:", error);
        return { success: false, message: "Failed to fetch admins" };
    }
};
const getAdminById = async (adminId) => {
    try {
        const admin = await adminModel_1.default.findById(adminId);
        if (!admin) {
            return { success: false, message: "Admin not found" };
        }
        return {
            success: true,
            message: "Admin fetched successfully",
            data: admin,
        };
    }
    catch (error) {
        console.error("Error fetching admin:", error);
        return { success: false, message: "Failed to fetch admin" };
    }
};
const suspendAdmin = async (adminId) => {
    try {
        const updated = await adminModel_1.default.findByIdAndUpdate(adminId, { suspended: true }, { new: true });
        if (!updated) {
            return { success: false, message: "Admin not found" };
        }
        return {
            success: true,
            message: "Admin suspended successfully",
            data: updated,
        };
    }
    catch (error) {
        console.error("Error suspending admin:", error);
        return { success: false, message: "Failed to suspend admin" };
    }
};
const reinstateAdmin = async (adminId) => {
    try {
        const updated = await adminModel_1.default.findByIdAndUpdate(adminId, { suspended: false }, { new: true });
        if (!updated) {
            return { success: false, message: "Admin not found" };
        }
        return {
            success: true,
            message: "Admin reinstated successfully",
            data: updated,
        };
    }
    catch (error) {
        console.error("Error reinstating admin:", error);
        return { success: false, message: "Failed to reinstate admin" };
    }
};
const changePassword = async (adminId, newPassword) => {
    try {
        const updated = await adminModel_1.default.findByIdAndUpdate(adminId, { password: newPassword }, { new: true });
        if (!updated) {
            return { success: false, message: "Admin not found" };
        }
        return {
            success: true,
            message: "Password changed successfully",
            data: updated,
        };
    }
    catch (error) {
        console.error("Error changing admin password:", error);
        return { success: false, message: "Failed to change admin password" };
    }
};
exports.adminServices = {
    adminExists,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getAllAdmins,
    getAdminById,
    suspendAdmin,
    reinstateAdmin,
    changePassword,
};
