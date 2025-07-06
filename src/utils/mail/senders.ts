import { sendEmail } from "./sendMail";
import { loadTemplate, compileTemplate } from "./template";

interface AdminInviteData {
  to: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export const sendAdminInviteEmail = async ({
  to,
  first_name,
  last_name,
  email,
  password,
  role,
}: AdminInviteData) => {
  const loginUrl = "http://localhost:5173";

  const htmlRaw = await loadTemplate("admin-invite");
  const html = compileTemplate(htmlRaw, {
    first_name,
    last_name,
    email,
    password,
    role,
    loginUrl,
  });

  await sendEmail({
    to,
    subject: "You're Invited to Be an Admin",
    text: `Hello ${first_name},\n\nYou've been invited as a(n) ${role}.\nLogin with:\nEmail: ${email}\nPassword: ${password}\n\nLogin here: ${loginUrl}`,
    html,
  });
};

export const sendOtpMail = async (
  to: string,
  otp: string,
  first_name: string
) => {
  const htmlRaw = await loadTemplate("otp-template");
  const html = compileTemplate(htmlRaw, {
    otp,
    first_name,
    year: new Date().getFullYear(),
  });

  await sendEmail({
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
    html,
  });
};
