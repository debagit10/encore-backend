import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { adminRoutes } from "./routes/adminRoutes";
import { toolRoutes } from "./routes/toolRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { reviewRoutes } from "./routes/reviewRoutes";
import { uploadImage, uploadMiddleware } from "./utils/uploadImage";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/tool", toolRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/review", reviewRoutes);

app.post("/api/upload-image", uploadMiddleware, uploadImage);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Encore AI backend server live" });
});

export default app;
