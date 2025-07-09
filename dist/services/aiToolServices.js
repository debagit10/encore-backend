"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const aiToolModel_1 = __importDefault(require("../models/aiToolModel"));
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const addTool = async (toolData) => {
    try {
        const newTool = new aiToolModel_1.default({
            ...toolData,
            category_id: new mongoose_1.default.Types.ObjectId(toolData.category),
        });
        const savedTool = await newTool.save();
        return {
            success: true,
            message: "Tool added successfully",
            data: savedTool,
        };
    }
    catch (error) {
        console.error("Error adding tool:", error);
        return { success: false, message: "Failed to add tool" };
    }
};
const editTool = async (toolId, updateData) => {
    try {
        const updated = await aiToolModel_1.default.findByIdAndUpdate(toolId, updateData, {
            new: true,
        });
        if (!updated) {
            return { success: false, message: "Tool not found" };
        }
        return {
            success: true,
            message: "Tool updated successfully",
            data: updated,
        };
    }
    catch (error) {
        console.error("Error editting tool:", error);
        return { success: false, message: "Failed to edit tool" };
    }
};
const deleteTool = async (toolId) => {
    try {
        const deleted = await aiToolModel_1.default.findByIdAndDelete(toolId);
        if (!deleted) {
            return { success: false, message: "Tool not found" };
        }
        return {
            success: true,
            message: "Tool deleted successfully",
            data: deleted,
        };
    }
    catch (error) {
        console.error("Error deleting tool:", error);
        return { success: false, message: "Failed to delete tool" };
    }
};
const getAllTools = async () => {
    try {
        const tools = await aiToolModel_1.default.find({ deleted: false }).populate("category_id", "name");
        const toolsWithRatings = await Promise.all(tools.map(async (tool) => {
            const reviews = await reviewModel_1.default.find({ toolId: tool._id });
            const averageRating = reviews.length > 0
                ? Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) /
                    reviews.length)
                : 0;
            return {
                ...tool.toObject(),
                averageRating,
            };
        }));
        return {
            success: true,
            message: "Tools fetched successfully",
            data: toolsWithRatings,
        };
    }
    catch (error) {
        console.error("Error fetching tools:", error);
        return { success: false, message: "Failed to fetch tools" };
    }
};
const getToolById = async (toolId) => {
    try {
        const tool = await aiToolModel_1.default.findOne({
            _id: toolId,
            deleted: false,
        }).populate("category_id", "name");
        if (!tool) {
            return { success: false, message: "Tool not found" };
        }
        const reviews = await reviewModel_1.default.find({ toolId });
        const averageRating = reviews.length > 0
            ? Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) /
                reviews.length)
            : 0;
        return {
            success: true,
            message: "Tool fetched successfully",
            data: {
                ...tool.toObject(),
                averageRating,
            },
        };
    }
    catch (error) {
        console.error("Error fetching tool:", error);
        return { success: false, message: "Failed to fetch tool" };
    }
};
exports.toolServices = {
    addTool,
    editTool,
    deleteTool,
    getToolById,
    getAllTools,
};
