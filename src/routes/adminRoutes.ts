import { Router } from "express";
import { createAdmin } from "../controllers/adminControllers";

export const adminRoutes = Router();

adminRoutes.post("/create", createAdmin);
