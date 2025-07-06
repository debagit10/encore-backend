import {
  addReview,
  removeReview,
  getAllReviews,
  getReviewById,
  getToolReview,
} from "../controllers/reviewControllers";

import { Router } from "express";

export const reviewRoutes = Router();

reviewRoutes.post("/add", addReview);

reviewRoutes.delete("/delete/:reviewId", removeReview);

reviewRoutes.get("/get", getAllReviews);
reviewRoutes.get("/details/:reviewId", getReviewById);
reviewRoutes.get("/tool/:toolId", getToolReview);
