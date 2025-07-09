"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTop5Tools = void 0;
const reviewModel_1 = __importDefault(require("../../models/reviewModel"));
const getTop5Tools = async (_req, res) => {
    try {
        const result = await reviewModel_1.default.aggregate([
            {
                $group: {
                    _id: "$toolId",
                    averageRating: { $avg: "$rating" },
                    reviewCount: { $sum: 1 },
                },
            },
            {
                $sort: { averageRating: -1 },
            },
            {
                $limit: 5,
            },
            {
                $lookup: {
                    from: "ai_tools",
                    localField: "_id",
                    foreignField: "_id",
                    as: "tool",
                },
            },
            {
                $unwind: "$tool",
            },
            {
                $project: {
                    _id: 0,
                    toolId: "$tool._id",
                    name: "$tool.name",
                    image: "$tool.image",
                    averageRating: 1,
                    reviewCount: 1,
                },
            },
        ]);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error getting top tools:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get top tools",
        });
        return;
    }
};
exports.getTop5Tools = getTop5Tools;
