import mongoose from "mongoose";
import AI_Tool from "../models/aiToolModel";
import Review from "../models/reviewModel";

interface ToolData {
  name: string;
  description: string;
  category: string;
  deleted: boolean;
  demo_url: string;
  image: string;
}

const addTool = async (toolData: ToolData) => {
  try {
    const newTool = new AI_Tool({
      ...toolData,
      category_id: new mongoose.Types.ObjectId(toolData.category),
    });

    const savedTool = await newTool.save();

    return {
      success: true,
      message: "Tool added successfully",
      data: savedTool,
    };
  } catch (error) {
    console.error("Error adding tool:", error);
    return { success: false, message: "Failed to add tool" };
  }
};

const editTool = async (toolId: string, updateData: Partial<ToolData>) => {
  try {
    const updated = await AI_Tool.findByIdAndUpdate(toolId, updateData, {
      new: true,
    });

    if (!updated) {
      return { success: false, message: "Tool not found" };
    }

    return {
      success: true,
      message: "Tool updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("Error editting tool:", error);
    return { success: false, message: "Failed to edit tool" };
  }
};

const deleteTool = async (toolId: string) => {
  try {
    const deleted = await AI_Tool.findByIdAndDelete(toolId);

    if (!deleted) {
      return { success: false, message: "Tool not found" };
    }

    return {
      success: true,
      message: "Tool deleted successfully",
      data: deleted,
    };
  } catch (error) {
    console.error("Error deleting tool:", error);
    return { success: false, message: "Failed to delete tool" };
  }
};

const getAllTools = async () => {
  try {
    const tools = await AI_Tool.find({ deleted: false }).populate(
      "category_id",
      "name"
    );

    const toolsWithRatings = await Promise.all(
      tools.map(async (tool) => {
        const reviews = await Review.find({ toolId: tool._id });

        const averageRating =
          reviews.length > 0
            ? Math.round(
                reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length
              )
            : 0;

        return {
          ...tool.toObject(),
          averageRating,
        };
      })
    );

    return {
      success: true,
      message: "Tools fetched successfully",
      data: toolsWithRatings,
    };
  } catch (error) {
    console.error("Error fetching tools:", error);
    return { success: false, message: "Failed to fetch tools" };
  }
};

const getToolById = async (toolId: string) => {
  try {
    const tool = await AI_Tool.findOne({
      _id: toolId,
      deleted: false,
    }).populate("category_id", "name");

    if (!tool) {
      return { success: false, message: "Tool not found" };
    }

    const reviews = await Review.find({ toolId });

    const averageRating =
      reviews.length > 0
        ? Math.round(
            reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
          )
        : 0;

    return {
      success: true,
      message: "Tool fetched successfully",
      data: {
        ...tool.toObject(),
        averageRating,
      },
    };
  } catch (error) {
    console.error("Error fetching tool:", error);
    return { success: false, message: "Failed to fetch tool" };
  }
};

export const toolServices = {
  addTool,
  editTool,
  deleteTool,
  getToolById,
  getAllTools,
};
