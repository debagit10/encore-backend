import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { adminRoutes } from "./routes/adminRoutes";
import { toolRoutes } from "./routes/toolRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { reviewRoutes } from "./routes/reviewRoutes";
import { uploadImage, uploadMiddleware } from "./utils/uploadImage";
import { updateProfile } from "./utils/editProfile";
import { getTop5Tools } from "./utils/metrics/top5Tools";
import { getTopCategories } from "./utils/metrics/top5Categories";
import { recentTools } from "./utils/metrics/recentlyAdded";
import { trackVisits } from "./utils/trackVisits";
import { topVisited } from "./utils/metrics/topVisitedTools";

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/tool", toolRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/review", reviewRoutes);

app.post("/api/upload-image", uploadMiddleware, uploadImage);

app.put("/api/edit-profile/:userId", updateProfile);

app.get("/api/top-tools", getTop5Tools);
app.get("/api/top-categories", getTopCategories);
app.get("/api/recent-tools", recentTools);
app.get("/api/top-visited", topVisited);

app.post("/api/track-visits/:toolId", trackVisits);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Encore AI backend server live" });
});

export default app;
