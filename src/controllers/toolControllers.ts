import { Request, Response } from "express";
import { adminServices } from "../services/adminServices";
import { otpServices } from "../utils/otp";
import { passwordServices } from "../utils/password";
import { toolServices } from "../services/aiToolServices";

interface ToolData {
  name: string;
  short_desc: string;
  long_desc: string;
  category: string;
  deleted: boolean;
  demoLink: string;
  image: string;
}

export const addTool = async (req: Request, res: Response) => {
  const toolData: ToolData = req.body;

  try {
    const result = await toolServices.addTool({
      ...toolData,
      deleted: false,
    });

    if (!result.success) {
      res.status(400).json({ error: "Failed to add tool" });
      return;
    }

    res.status(201).json(result);
    return;
  } catch (error) {
    console.error("Error adding tool:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const getAllTools = async (_req: Request, res: Response) => {
  try {
    const tools = await toolServices.getAllTools();

    if (!tools.success) {
      res.status(400).json(tools);
      return;
    }

    res.status(200).json(tools);
    return;
  } catch (error) {
    console.error("Error fetching tools:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const editTool = async (req: Request, res: Response) => {
  const { toolId } = req.params;
  const toolData: ToolData = req.body;

  try {
    const result = await toolServices.editTool(toolId, toolData);
  } catch (error) {
    console.error("Error editting tool:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const deleteTool = async (req: Request, res: Response) => {
  const { toolId } = req.params;

  try {
    const result = await toolServices.deleteTool(toolId);

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
    return;
  } catch (error) {
    console.error("Error deleting tool:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const getTool = async (req: Request, res: Response) => {
  const { toolId } = req.params;
  try {
    const tool = await toolServices.getToolById(toolId);

    if (!tool.success) {
      res.status(400).json(tool);
      return;
    }

    res.status(200).json(tool);
    return;
  } catch (error) {
    console.error("Error fetching tool detail:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
