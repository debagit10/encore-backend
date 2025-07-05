import mongoose from "mongoose";

interface IAI_Tool {
  name: string;
  description: string;
  category_id: mongoose.Types.ObjectId;
  deleted: boolean;
  demo_url: string;
  image: string;
}

const aiToolSchema = new mongoose.Schema<IAI_Tool>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    demo_url: { type: String, required: true },
    image: { type: String, required: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AI_Tool = mongoose.model("AI_Tool", aiToolSchema);

export default AI_Tool;
