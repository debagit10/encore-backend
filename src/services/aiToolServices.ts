import AI_Tool from "../models/aiToolModel";

interface ToolData {
  name: string;
  short_desc: string;
  long_desc: string;
  category: string;
  deleted: boolean;
  demoLink: string;
  image: string;
}

const addTool = async (toolData: ToolData) => {
  try {
    const newTool = new AI_Tool(toolData);

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
    const tools = await AI_Tool.find();

    return {
      success: true,
      message: "Tools fetched successfully",
      data: tools,
    };
  } catch (error) {
    console.error("Error fetching tools:", error);
    return { success: false, message: "Failed to fetch tools" };
  }
};

const getToolById = async (toolId: string) => {
  try {
    const tool = await AI_Tool.findById(toolId);

    if (!tool) {
      return { success: false, message: "Tool not found" };
    }

    return {
      success: true,
      message: "Tool fetched successfully",
      data: tool,
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
