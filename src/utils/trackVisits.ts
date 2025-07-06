import Visit from "../models/clickModel";
import { Request, Response } from "express";

export const trackVisits = async (req: Request, res: Response) => {
  const { toolId } = req.params;

  try {
    await Visit.create({
      toolId,
    });

    res.status(201).json({ message: "Click tracked" });
  } catch (error) {
    console.error("Error tracking click:", error);
    res.status(500).json({ message: "Failed to track click" });
  }
};
