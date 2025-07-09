"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const aiToolSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    demo_url: { type: String, required: true },
    image: { type: String, required: false },
    deleted: { type: Boolean, default: false },
}, { timestamps: true });
const AI_Tool = mongoose_1.default.model("AI_Tool", aiToolSchema);
exports.default = AI_Tool;
