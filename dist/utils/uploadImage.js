"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path_1.default.extname(file.originalname)),
});
const upload = (0, multer_1.default)({ storage });
exports.uploadMiddleware = upload.single("image");
const uploadImage = async (req, res) => {
    try {
        const filePath = req.file?.path;
        if (!filePath) {
            res.status(400).json({ success: false, message: "No file uploaded" });
            return;
        }
        const result = await cloudinary_1.v2.uploader.upload(filePath, {
            folder: "encore",
        });
        fs_1.default.unlinkSync(filePath);
        res.status(200).json({
            success: true,
            imageUrl: result.secure_url,
        });
        return;
    }
    catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to upload image",
        });
        return;
    }
};
exports.uploadImage = uploadImage;
