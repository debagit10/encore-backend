import { Request, Response } from "express";
import { categoryServices } from "../services/categoryServices";

interface CategoryData {
  id?: string;
  name: string;
  deleted: boolean;
  description: string;
}

export const addCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body as CategoryData;

  try {
    const response = await categoryServices.createCategory({
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
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ success: false, message: "Failed to add category" });
    return;
  }
};

export const editCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryData: CategoryData = req.body;

  try {
    const response = await categoryServices.editCategory(id, categoryData);

    if (!response.success) {
      res.status(400).json(response);
      return;
    }

    res.status(200).json(response);
    return;
  } catch (error) {
    console.error("Error editing category:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to edit category" });
    return;
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await categoryServices.deleteCategory(id);

    if (!response.success) {
      res.status(400).json(response);
      return;
    }

    res.status(200).json(response);
    return;
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete category" });
    return;
  }
};

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryServices.getAllCategories();

    if (!categories.success) {
      res.status(400).json(categories);
      return;
    }

    res.status(200).json(categories);
    return;
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await categoryServices.getCategoryById(id);

    if (!response.success) {
      res.status(400).json(response);
      return;
    }

    res.status(200).json(response);
    return;
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
