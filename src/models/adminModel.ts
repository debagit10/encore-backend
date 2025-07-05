import mongoose from "mongoose";

interface IAdmin {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  suspended: boolean;
  deleted: boolean;
}

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    suspended: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
