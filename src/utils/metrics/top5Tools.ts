import Review from "../../models/reviewModel";
import { Request, Response } from "express";

export const getTop5Tools = async (_req: Request, res: Response) => {
  try {
    const result = await Review.aggregate([
      {
        $group: {
          _id: "$toolId",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "ai_tools",
          localField: "_id",
          foreignField: "_id",
          as: "tool",
        },
      },
      {
        $unwind: "$tool",
      },
      {
        $project: {
          _id: 0,
          toolId: "$tool._id",
          name: "$tool.name",
          image: "$tool.image",
          averageRating: 1,
          reviewCount: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting top tools:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get top tools",
    });
    return;
  }
};
