import { Request, Response } from "express";
import Review from "../../models/reviewModel";

export const getTopCategories = async (_req: Request, res: Response) => {
  try {
    const result = await Review.aggregate([
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
  } catch (error) {
    console.error("Error getting top categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get top categories",
    });
    return;
  }
};
