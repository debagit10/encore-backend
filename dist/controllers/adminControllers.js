"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyForgotPassword = exports.forgotPassword = exports.changePassword = exports.reinstateAdmin = exports.suspendAdmin = exports.deleteAdmin = exports.updateAdmin = exports.getAllAdmins = exports.loginAdmin = exports.createAdmin = void 0;
const adminServices_1 = require("../services/adminServices");
const otp_1 = require("../utils/otp");
const password_1 = require("../utils/password");
const senders_1 = require("../utils/mail/senders");
const createAdmin = async (req, res) => {
    const adminData = req.body;
    try {
        // Check if the admin already exists
        const existingAdmin = await adminServices_1.adminServices.adminExists(adminData.email);
        if (existingAdmin.success) {
            res.status(400).json({
                success: false,
                message: "Admin already exists",
            });
            return;
        }
        const password = await password_1.passwordServices.hashPassword(adminData.password);
        // Create the new admin
        const result = await adminServices_1.adminServices.addAdmin({
            ...adminData,
            password,
            suspended: false,
            deleted: false,
        });
        if (result.success) {
            await (0, senders_1.sendAdminInviteEmail)({
                ...adminData,
                password: adminData.password,
                to: adminData.email,
            });
            res.status(201).json({ result });
            return;
        }
        res.status(400).json(result);
        return;
    }
    catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.createAdmin = createAdmin;
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingAdmin = await adminServices_1.adminServices.adminExists(email);
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
        const isPasswordValid = await password_1.passwordServices.verifyPassword(password, admin.password);
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
    }
    catch (error) {
        console.error("Error logging in admin:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.loginAdmin = loginAdmin;
const getAllAdmins = async (_req, res) => {
    try {
        const admins = await adminServices_1.adminServices.getAllAdmins();
        if (!admins.success) {
            res.status(400).json(admins);
            return;
        }
        res.status(200).json(admins);
        return;
    }
    catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.getAllAdmins = getAllAdmins;
const updateAdmin = async (req, res) => {
    const { adminId } = req.params;
    const adminData = req.body;
    try {
        const result = await adminServices_1.adminServices.updateAdmin(adminId, adminData);
        if (!result.success) {
            res.status(400).json(result);
            return;
        }
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error("Error updating admin:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.updateAdmin = updateAdmin;
const deleteAdmin = async (req, res) => {
    const { adminId } = req.params;
    try {
        const result = await adminServices_1.adminServices.deleteAdmin(adminId);
        if (!result.success) {
            res.status(400).json(result);
            return;
        }
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error("Error deleting admin:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.deleteAdmin = deleteAdmin;
const suspendAdmin = async (req, res) => {
    const { adminId } = req.params;
    try {
        const result = await adminServices_1.adminServices.suspendAdmin(adminId);
        if (!result.success) {
            res.status(400).json(result);
            return;
        }
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error("Error suspending admin:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.suspendAdmin = suspendAdmin;
const reinstateAdmin = async (req, res) => {
    const { adminId } = req.params;
    try {
        const result = await adminServices_1.adminServices.reinstateAdmin(adminId);
        if (!result.success) {
            res.status(400).json(result);
            return;
        }
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error("Error reinstating admin:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.reinstateAdmin = reinstateAdmin;
const changePassword = async (req, res) => {
    const { adminId } = req.params;
    const passwordData = req.body;
    try {
        const { data } = await adminServices_1.adminServices.getAdminById(adminId);
        const verify = await password_1.passwordServices.verifyPassword(passwordData.curPassword, String(data?.password));
        if (!verify) {
            res.status(500).json({ error: "Current password incorrect" });
            return;
        }
        const result = await adminServices_1.adminServices.changePassword(adminId, await password_1.passwordServices.hashPassword(passwordData.newPassword));
        if (!result.success) {
            res.status(400).json(result);
            return;
        }
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.changePassword = changePassword;
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const { data } = await adminServices_1.adminServices.adminExists(email);
        if (!data) {
            res.status(404).json({ error: "Email not an admin" });
            return;
        }
        const otp = otp_1.otpServices.generateOtp();
        await otp_1.otpServices.storeOtp(String(data?._id), otp);
        await (0, senders_1.sendOtpMail)(data.email, otp, data.first_name);
        res
            .status(200)
            .json({ success: true, message: "OTP sent. Check mail", data });
        return;
    }
    catch (error) {
        console.error("Error in forgot password:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.forgotPassword = forgotPassword;
const verifyForgotPassword = async (req, res) => {
    const { adminId } = req.params;
    const { otp } = req.body;
    try {
        const verify = await otp_1.otpServices.verifyOtp(adminId, otp);
        if (verify.success === false) {
            res.status(500).json(verify);
            return;
        }
        res.status(200).json(verify);
        return;
    }
    catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.verifyForgotPassword = verifyForgotPassword;
