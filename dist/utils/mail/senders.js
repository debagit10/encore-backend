"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpMail = exports.sendAdminInviteEmail = void 0;
const sendMail_1 = require("./sendMail");
const template_1 = require("./template");
const sendAdminInviteEmail = async ({ to, first_name, last_name, email, password, role, }) => {
    const loginUrl = "http://localhost:5173";
    const htmlRaw = await (0, template_1.loadTemplate)("admin-invite");
    const html = (0, template_1.compileTemplate)(htmlRaw, {
        first_name,
        last_name,
        email,
        password,
        role,
        loginUrl,
    });
    await (0, sendMail_1.sendEmail)({
        to,
        subject: "You're Invited to Be an Admin",
        text: `Hello ${first_name},\n\nYou've been invited as a(n) ${role}.\nLogin with:\nEmail: ${email}\nPassword: ${password}\n\nLogin here: ${loginUrl}`,
        html,
    });
};
exports.sendAdminInviteEmail = sendAdminInviteEmail;
const sendOtpMail = async (to, otp, first_name) => {
    const htmlRaw = await (0, template_1.loadTemplate)("otp-template");
    const html = (0, template_1.compileTemplate)(htmlRaw, {
        otp,
        first_name,
        year: new Date().getFullYear(),
    });
    await (0, sendMail_1.sendEmail)({
        to,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
        html,
    });
};
exports.sendOtpMail = sendOtpMail;
