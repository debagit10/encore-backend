"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackVisits = void 0;
const clickModel_1 = __importDefault(require("../models/clickModel"));
const trackVisits = async (req, res) => {
    const { toolId } = req.params;
    try {
        await clickModel_1.default.create({
            toolId,
        });
        res.status(201).json({ message: "Click tracked" });
    }
    catch (error) {
        console.error("Error tracking click:", error);
        res.status(500).json({ message: "Failed to track click" });
    }
};
exports.trackVisits = trackVisits;
