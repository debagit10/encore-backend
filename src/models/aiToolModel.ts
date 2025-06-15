import mongoose from "mongoose";

interface IAI_Tool {
  name: string;
  short_desc: string;
  long_desc: string;
  category: string;
  deleted: boolean;
  demoLink: string;
  image: string;
}

const aiToolSchema = new mongoose.Schema<IAI_Tool>(
  {
    name: { type: String, required: true },
    short_desc: { type: String, required: true },
    long_desc: { type: String, required: true },
    category: { type: String, required: true },
    demoLink: { type: String, required: true },
    image: { type: String, required: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AI_Tool = mongoose.model("AI_Tool", aiToolSchema);

export default AI_Tool;
