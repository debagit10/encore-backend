import { Router } from "express";

import {
  addTool,
  editTool,
  deleteTool,
  getAllTools,
  getTool,
} from "../controllers/toolControllers";

export const toolRoutes = Router();

toolRoutes.post("/add", addTool);

toolRoutes.get("/all", getAllTools);
toolRoutes.get("/:toolId", getTool);

toolRoutes.put("/edit/:toolId", editTool);

toolRoutes.delete("/delete/:toolId", deleteTool);
