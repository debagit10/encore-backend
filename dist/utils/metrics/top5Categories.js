"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopCategories = void 0;
const reviewModel_1 = __importDefault(require("../../models/reviewModel"));
const getTopCategories = async (_req, res) => {
    try {
        const result = await reviewModel_1.default.aggregate([
            {
                $group: {
                    _id: "$categoryId",
                    averageRating: { $avg: "$rating" },
                    reviewCount: { $sum: 1 },
                },
            },
            {
                $sort: {
                    averageRating: -1,
                },
            },
            { $limit: 5 },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "category",
                },
            },
            { $unwind: "$category" },
            {
                $project: {
                    _id: 0,
                    categoryId: "$category._id",
                    name: "$category.name",
                    reviewCount: 1,
                    averageRating: 1,
                },
            },
        ]);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error getting top categories:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get top categories",
        });
        return;
    }
};
exports.getTopCategories = getTopCategories;
