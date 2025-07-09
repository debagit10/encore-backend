"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryServices = void 0;
const aiToolModel_1 = __importDefault(require("../models/aiToolModel"));
const categoryModels_1 = __importDefault(require("../models/categoryModels"));
const createCategory = async (categoryData) => {
    try {
        const newCategory = new categoryModels_1.default(categoryData);
        const savedTool = await newCategory.save();
        return {
            success: true,
            message: "Category created successfully",
            data: savedTool,
        };
    }
    catch (error) {
        console.error("Error adding tool:", error);
        return { success: false, message: "Failed to create category" };
    }
};
const editCategory = async (categoryId, updateData) => {
    try {
        const updated = await categoryModels_1.default.findByIdAndUpdate(categoryId, updateData, {
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
    }
    catch (error) {
        console.error("Error editting category:", error);
        return { success: false, message: "Failed to edit category" };
    }
};
const deleteCategory = async (categoryId) => {
    try {
        const deleted = await categoryModels_1.default.findByIdAndDelete(categoryId);
        if (!deleted) {
            return { success: false, message: "Category not found" };
        }
        return {
            success: true,
            message: "Category deleted successfully",
            data: deleted,
        };
    }
    catch (error) {
        console.error("Error deleting category:", error);
        return { success: false, message: "Failed to delete category" };
    }
};
const getAllCategories = async () => {
    try {
        const categories = await categoryModels_1.default.aggregate([
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
    }
    catch (error) {
        console.error("Error fetching tools:", error);
        return { success: false, message: "Failed to fetch tools" };
    }
};
const getCategoryById = async (categoryId) => {
    try {
        const category = await categoryModels_1.default.findById(categoryId);
        if (!category) {
            return { success: false, message: "Category not found" };
        }
        const tools = await aiToolModel_1.default.find({ category_id: categoryId }).select("name demo_url image");
        return {
            success: true,
            message: "Category fetched successfully",
            data: {
                category,
                tools,
            },
        };
    }
    catch (error) {
        console.error("Error fetching category:", error);
        return { success: false, message: "Failed to fetch category" };
    }
};
exports.categoryServices = {
    createCategory,
    editCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
};
