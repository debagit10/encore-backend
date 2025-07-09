"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const fileFilter = (req, file, cb) => {
    const ext = path_1.default.extname(file.originalname);
    if (ext === ".xlsx" || ext === ".xls")
        cb(null, true);
    else
        cb(new Error("Only Excel files are allowed"), false);
};
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.default = upload;
