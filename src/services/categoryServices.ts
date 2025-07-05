import AI_Tool from "../models/aiToolModel";
import Category from "../models/categoryModels";

interface CategoryData {
  name: string;
  deleted: boolean;
  description: string;
}

const createCategory = async (categoryData: CategoryData) => {
  try {
    const newCategory = new Category(categoryData);

    const savedTool = await newCategory.save();

    return {
      success: true,
      message: "Category created successfully",
      data: savedTool,
    };
  } catch (error) {
    console.error("Error adding tool:", error);
    return { success: false, message: "Failed to create category" };
  }
};

const editCategory = async (
  categoryId: string,
  updateData: Partial<CategoryData>
) => {
  try {
    const updated = await Category.findByIdAndUpdate(categoryId, updateData, {
      new: true,
    });

    if (!updated) {
      return { success: false, message: "Category not found" };
    }

    return {
      success: true,
      message: "Category updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("Error editting category:", error);
    return { success: false, message: "Failed to edit category" };
  }
};

const deleteCategory = async (categoryId: string) => {
  try {
    const deleted = await Category.findByIdAndDelete(categoryId);

    if (!deleted) {
      return { success: false, message: "Category not found" };
    }

    return {
      success: true,
      message: "Category deleted successfully",
      data: deleted,
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: "Failed to delete category" };
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "ai_tools",
          localField: "_id",
          foreignField: "category_id",
          as: "tools",
        },
      },
      {
        $addFields: {
          toolCount: { $size: "$tools" },
        },
      },
      {
        $project: {
          name: 1,
          toolCount: 1,
        },
      },
    ]);

    return {
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    };
  } catch (error) {
    console.error("Error fetching tools:", error);
    return { success: false, message: "Failed to fetch tools" };
  }
};

const getCategoryById = async (categoryId: string) => {
  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    const tools = await AI_Tool.find({ category_id: categoryId }).select(
      "name demo_url image"
    );

    return {
      success: true,
      message: "Category fetched successfully",
      data: {
        category,
        tools,
      },
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    return { success: false, message: "Failed to fetch category" };
  }
};

export const categoryServices = {
  createCategory,
  editCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
};
