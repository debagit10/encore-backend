import mongoose from "mongoose";

interface IReview {
  message: string;
  rating: number;
  deleted: boolean;
  approved: boolean;
  toolId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "AI_Tool";
  };
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    message: { type: String, required: true },
    rating: { type: Number, required: true },
    deleted: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    toolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AI_Tool",
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
