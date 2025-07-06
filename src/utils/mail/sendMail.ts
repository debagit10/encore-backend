import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

interface MailProps {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: MailProps): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Email sending failed");
  }
};
