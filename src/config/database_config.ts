import mongoose from "mongoose";

const uri = String(process.env.MONGODB_URI);

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error; // important to throw to stop the server if DB connection fails
  }
};
