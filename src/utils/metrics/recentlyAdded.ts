import AI_Tool from "../../models/aiToolModel";
import { Response, Request } from "express";

export const recentTools = async (_req: Request, res: Response) => {
  try {
    const result = await AI_Tool.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting recent tools:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get recent tools",
    });
    return;
  }
};
