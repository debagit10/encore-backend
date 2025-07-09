"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topVisited = void 0;
const clickModel_1 = __importDefault(require("../../models/clickModel"));
const topVisited = async (req, res) => {
    try {
        const result = await clickModel_1.default.aggregate([
            { $group: { _id: "$toolId", visitCount: { $sum: 1 } } },
            { $sort: { visitCount: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "ai_tools",
                    localField: "_id",
                    foreignField: "_id",
                    as: "tool",
                },
            },
            { $unwind: "$tool" },
            {
                $project: {
                    _id: 0,
                    toolId: "$tool._id",
                    name: "$tool.name",
                    image: "$tool.image",
                    visitCount: 1,
                },
            },
        ]);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error getting top visited tools:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get top visited tools",
        });
        return;
    }
};
exports.topVisited = topVisited;
