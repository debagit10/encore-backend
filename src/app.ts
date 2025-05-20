import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Middle Hill backend server live" });
});

export default app;
