import Review from "../models/reviewModel";

interface ReviewData {
  message: string;
  rating: number;
  deleted: boolean;
  approved: boolean;
  toolId: string;
}

const createReview = async (reviewData: ReviewData) => {
  try {
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

const editReview = async (
  reviewId: string,
  updateData: Partial<ReviewData>
) => {
  try {
    const updated = await Review.findByIdAndUpdate(reviewId, updateData, {
      new: true,
    });

    if (!updated) {
      return { success: false, message: "Review not found" };
    }

    return {
      success: true,
      message: "Review updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("Error editing review:", error);
    return { success: false, message: "Failed to edit review" };
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
    const reviews = await Review.find({ deleted: false }).populate("toolId");

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
    const review = await Review.findById(reviewId).populate("toolId");

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
  editReview,
  deleteReview,
  getAllReviews,
  getReviewById,
};
