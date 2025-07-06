import {
  addReview,
  removeReview,
  getAllReviews,
  getReviewById,
} from "../controllers/reviewControllers";

import { Router } from "express";

export const reviewRoutes = Router();

reviewRoutes.post("/add", addReview);

reviewRoutes.delete("/delete/:reviewId", removeReview);

reviewRoutes.get("/get", getAllReviews);
reviewRoutes.get("/details/:reviewId", getReviewById);
