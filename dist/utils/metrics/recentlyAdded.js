"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentTools = void 0;
const aiToolModel_1 = __importDefault(require("../../models/aiToolModel"));
const recentTools = async (_req, res) => {
    try {
        const result = await aiToolModel_1.default.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error getting recent tools:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get recent tools",
        });
        return;
    }
};
exports.recentTools = recentTools;
