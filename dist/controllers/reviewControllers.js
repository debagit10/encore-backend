"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToolReview = exports.getReviewById = exports.getAllReviews = exports.removeReview = exports.addReview = void 0;
const reviewServices_1 = __importDefault(require("../services/reviewServices"));
const addReview = async (req, res) => {
    const reviewData = req.body;
    try {
        const result = await reviewServices_1.default.createReview(reviewData);
        if (!result.success) {
            res.status(400).json({ error: "Failed to add review" });
            return;
        }
        res.status(201).json(result);
        return;
    }
    catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.addReview = addReview;
const removeReview = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const result = await reviewServices_1.default.deleteReview(reviewId);
        if (!result.success) {
            res.status(400).json({ error: "Failed to delete review" });
            return;
        }
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.removeReview = removeReview;
const getAllReviews = async (_req, res) => {
    try {
        const reviews = await reviewServices_1.default.getAllReviews();
        if (!reviews.success) {
            res.status(400).json(reviews);
            return;
        }
        res.status(200).json(reviews);
        return;
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.getAllReviews = getAllReviews;
const getReviewById = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await reviewServices_1.default.getReviewById(reviewId);
        if (!review.success) {
            res.status(404).json({ error: "Review not found" });
            return;
        }
        res.status(200).json(review);
        return;
    }
    catch (error) {
        console.error("Error fetching review:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.getReviewById = getReviewById;
const getToolReview = async (req, res) => {
    const { toolId } = req.params;
    try {
        const review = await reviewServices_1.default.getToolReview(toolId);
        if (!review.success) {
            res.status(404).json({ error: "Review not found" });
            return;
        }
        res.status(200).json(review);
        return;
    }
    catch (error) {
        console.error("Error fetching review:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.getToolReview = getToolReview;
