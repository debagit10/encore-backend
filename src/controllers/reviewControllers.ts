import reviewServices from "../services/reviewServices";
import { Request, Response } from "express";

interface ReviewData {
  message: string;
  rating: number;
  deleted: boolean;
  approved: boolean;
  toolId: string;
}

export const addReview = async (req: Request, res: Response) => {
  const reviewData: ReviewData = req.body;

  try {
    const result = await reviewServices.createReview(reviewData);

    if (!result.success) {
      res.status(400).json({ error: "Failed to add review" });
      return;
    }

    res.status(201).json(result);
    return;
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const reviewId = req.params.id;
  const updateData: Partial<ReviewData> = req.body;

  try {
    const result = await reviewServices.editReview(reviewId, updateData);

    if (!result.success) {
      res.status(400).json({ error: "Failed to update review" });
      return;
    }

    res.status(200).json(result);
    return;
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const removeReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  try {
    const result = await reviewServices.deleteReview(reviewId);

    if (!result.success) {
      res.status(400).json({ error: "Failed to delete review" });
      return;
    }

    res.status(200).json(result);
    return;
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const getAllReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await reviewServices.getAllReviews();

    if (!reviews.success) {
      res.status(400).json(reviews);
      return;
    }

    res.status(200).json(reviews);
    return;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  try {
    const review = await reviewServices.getReviewById(reviewId);

    if (!review.success) {
      res.status(404).json({ error: "Review not found" });
      return;
    }

    res.status(200).json(review);
    return;
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
