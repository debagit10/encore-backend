"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uri = String(process.env.MONGODB_URI);
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(uri);
        console.log("✅ Connected to MongoDB via Mongoose");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error; // important to throw to stop the server if DB connection fails
    }
};
exports.connectDB = connectDB;
