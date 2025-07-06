import mongoose from "mongoose";

interface Visit {
  toolId: mongoose.Types.ObjectId;
}

const visitSchema = new mongoose.Schema<Visit>(
  {
    toolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AI_Tool",
      required: true,
    },
  },
  { timestamps: true }
);

const Visit = mongoose.model("visit", visitSchema);

export default Visit;
