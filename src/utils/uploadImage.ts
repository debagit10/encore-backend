import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

export const uploadMiddleware = upload.single("image");

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const filePath = req.file?.path;

    if (!filePath) {
      res.status(400).json({ success: false, message: "No file uploaded" });
      return;
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "encore",
    });

    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
    });
    return;
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
    });
    return;
  }
};
