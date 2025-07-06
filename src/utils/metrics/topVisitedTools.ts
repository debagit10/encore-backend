import { Request, Response } from "express";
import Visit from "../../models/clickModel";

export const topVisited = async (req: Request, res: Response) => {
  try {
    const result = await Visit.aggregate([
      { $group: { _id: "$toolId", visitCount: { $sum: 1 } } },
      { $sort: { visitCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "ai_tools",
          localField: "_id",
          foreignField: "_id",
          as: "tool",
        },
      },
      { $unwind: "$tool" },
      {
        $project: {
          _id: 0,
          toolId: "$tool._id",
          name: "$tool.name",
          image: "$tool.image",
          visitCount: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting top visited tools:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get top visited tools",
    });
    return;
  }
};
