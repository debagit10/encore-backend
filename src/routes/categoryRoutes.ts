import {
  addCategory,
  editCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/catrgoryControllers";

import { Router } from "express";

export const categoryRoutes = Router();

categoryRoutes.post("/add", addCategory);

categoryRoutes.put("/edit/:id", editCategory);

categoryRoutes.delete("/delete/:id", deleteCategory);

categoryRoutes.get("/all", getAllCategories);
categoryRoutes.get("/details/:id", getCategoryById);
