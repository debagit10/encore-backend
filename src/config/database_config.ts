import mongoose from "mongoose";

const uri = String(process.env.MONGODB_URI);

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri, {
      dbName: "plasticonn",
    });

    console.log("✅ Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  } finally {
    await mongoose.disconnect();
  }
};
