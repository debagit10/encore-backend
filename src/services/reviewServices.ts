import Review from "../models/reviewModel";
import { reviewCheck } from "../utils/reviewCheck";

interface ReviewData {
  message: string;
  rating: number;
  deleted: boolean;
  approved: boolean;
  toolId: string;
}

const createReview = async (reviewData: ReviewData) => {
  try {
    const check = reviewCheck(reviewData.message);

    if (check === true) {
      return { success: false, message: "Comment not posted" };
    }

    const newReview = new Review({
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
  } catch (error) {
    console.error("Error creating review:", error);
    return { success: false, message: "Failed to create review" };
  }
};

const deleteReview = async (reviewId: string) => {
  try {
    const deleted = await Review.findByIdAndDelete(reviewId);

    if (!deleted) {
      return { success: false, message: "Review not found" };
    }

    return {
      success: true,
      message: "Review deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting review:", error);
    return { success: false, message: "Failed to delete review" };
  }
};

const getAllReviews = async () => {
  try {
    const reviews = await Review.find({ deleted: false }).populate({
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
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { success: false, message: "Failed to fetch reviews" };
  }
};

const getReviewById = async (reviewId: string) => {
  try {
    const review = await Review.findById(reviewId).populate({
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
  } catch (error) {
    console.error("Error fetching review:", error);
    return { success: false, message: "Failed to fetch review" };
  }
};

export default {
  createReview,

  deleteReview,
  getAllReviews,
  getReviewById,
};
