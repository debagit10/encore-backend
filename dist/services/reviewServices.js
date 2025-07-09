"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const reviewCheck_1 = require("../utils/reviewCheck");
const createReview = async (reviewData) => {
    try {
        const check = (0, reviewCheck_1.reviewCheck)(reviewData.message);
        if (check === true) {
            return { success: false, message: "Comment not posted" };
        }
        const newReview = new reviewModel_1.default({
            ...reviewData,
            deleted: false,
            approved: false,
        });
        const savedReview = await newReview.save();
        return {
            success: true,
            message: "Review created successfully",
            data: savedReview,
        };
    }
    catch (error) {
        console.error("Error creating review:", error);
        return { success: false, message: "Failed to create review" };
    }
};
const deleteReview = async (reviewId) => {
    try {
        const deleted = await reviewModel_1.default.findByIdAndDelete(reviewId);
        if (!deleted) {
            return { success: false, message: "Review not found" };
        }
        return {
            success: true,
            message: "Review deleted successfully",
        };
    }
    catch (error) {
        console.error("Error deleting review:", error);
        return { success: false, message: "Failed to delete review" };
    }
};
const getAllReviews = async () => {
    try {
        const reviews = await reviewModel_1.default.find({ deleted: false }).populate({
            path: "toolId",
            populate: {
                path: "category_id",
                select: "name",
            },
        });
        return {
            success: true,
            data: reviews,
        };
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        return { success: false, message: "Failed to fetch reviews" };
    }
};
const getReviewById = async (reviewId) => {
    try {
        const review = await reviewModel_1.default.findById(reviewId).populate({
            path: "toolId",
            populate: {
                path: "category_id",
                select: "name",
            },
        });
        if (!review) {
            return { success: false, message: "Review not found" };
        }
        return {
            success: true,
            data: review,
        };
    }
    catch (error) {
        console.error("Error fetching review:", error);
        return { success: false, message: "Failed to fetch review" };
    }
};
const getToolReview = async (toolId) => {
    try {
        const review = await reviewModel_1.default.find({ toolId }).sort({ createdAt: -1 });
        if (!review) {
            return { success: false, message: "Review not found" };
        }
        return {
            success: true,
            data: review,
        };
    }
    catch (error) {
        console.error("Error fetching tool review:", error);
        return { success: false, message: "Failed to fetch tool review" };
    }
};
exports.default = {
    createReview,
    getToolReview,
    deleteReview,
    getAllReviews,
    getReviewById,
};
