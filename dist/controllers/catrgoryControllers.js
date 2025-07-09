"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryById = exports.getAllCategories = exports.deleteCategory = exports.editCategory = exports.addCategory = void 0;
const categoryServices_1 = require("../services/categoryServices");
const addCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const response = await categoryServices_1.categoryServices.createCategory({
            name,
            description,
            deleted: false,
        });
        if (!response.success) {
            res.status(400).json(response);
            return;
        }
        res.status(201).json(response);
        return;
    }
    catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ success: false, message: "Failed to add category" });
        return;
    }
};
exports.addCategory = addCategory;
const editCategory = async (req, res) => {
    const { id } = req.params;
    const categoryData = req.body;
    try {
        const response = await categoryServices_1.categoryServices.editCategory(id, categoryData);
        if (!response.success) {
            res.status(400).json(response);
            return;
        }
        res.status(200).json(response);
        return;
    }
    catch (error) {
        console.error("Error editing category:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to edit category" });
        return;
    }
};
exports.editCategory = editCategory;
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await categoryServices_1.categoryServices.deleteCategory(id);
        if (!response.success) {
            res.status(400).json(response);
            return;
        }
        res.status(200).json(response);
        return;
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to delete category" });
        return;
    }
};
exports.deleteCategory = deleteCategory;
const getAllCategories = async (_req, res) => {
    try {
        const categories = await categoryServices_1.categoryServices.getAllCategories();
        if (!categories.success) {
            res.status(400).json(categories);
            return;
        }
        res.status(200).json(categories);
        return;
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await categoryServices_1.categoryServices.getCategoryById(id);
        if (!response.success) {
            res.status(400).json(response);
            return;
        }
        res.status(200).json(response);
        return;
    }
    catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.getCategoryById = getCategoryById;
