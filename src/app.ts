import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { adminRoutes } from "./routes/adminRoutes";
import { toolRoutes } from "./routes/toolRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/tool", toolRoutes);
app.use("/api/category", categoryRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Encore AI backend server live" });
});

export default app;
