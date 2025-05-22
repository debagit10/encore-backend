import Admin from "../models/adminModel";

interface AdminData {
  name: string;
  email: string;
  password: string;
  role: string;
  suspended: boolean;
  deleted: boolean;
}

const adminExists = async (email: string) => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return { success: false, message: "Admin not found" };
    }
    return { success: true, message: "Admin found", data: admin };
  } catch (error) {
    console.error("Error checking admin:", error);
    return { success: false, message: "Database error" };
  }
};

const addAdmin = async (adminData: AdminData) => {
  try {
    const newAdmin = new Admin(adminData);
    const savedAdmin = await newAdmin.save();
    return {
      success: true,
      message: "Admin created successfully",
      data: savedAdmin,
    };
  } catch (error) {
    console.error("Error creating admin:", error);
    return { success: false, message: "Failed to create admin" };
  }
};

const updateAdmin = async (adminId: string, updateData: Partial<AdminData>) => {
  try {
    const updated = await Admin.findByIdAndUpdate(adminId, updateData, {
      new: true,
    });
    if (!updated) {
      return { success: false, message: "Admin not found" };
    }
    return {
      success: true,
      message: "Admin updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("Error updating admin:", error);
    return { success: false, message: "Failed to update admin" };
  }
};

const deleteAdmin = async (adminId: string) => {
  try {
    const deleted = await Admin.findByIdAndDelete(adminId);
    if (!deleted) {
      return { success: false, message: "Admin not found" };
    }
    return {
      success: true,
      message: "Admin deleted successfully",
      data: deleted,
    };
  } catch (error) {
    console.error("Error deleting admin:", error);
    return { success: false, message: "Failed to delete admin" };
  }
};

const getAllAdmins = async () => {
  try {
    const admins = await Admin.find();
    return {
      success: true,
      message: "Admins fetched successfully",
      data: admins,
    };
  } catch (error) {
    console.error("Error fetching admins:", error);
    return { success: false, message: "Failed to fetch admins" };
  }
};

const getAdminById = async (adminId: string) => {
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return { success: false, message: "Admin not found" };
    }
    return {
      success: true,
      message: "Admin fetched successfully",
      data: admin,
    };
  } catch (error) {
    console.error("Error fetching admin:", error);
    return { success: false, message: "Failed to fetch admin" };
  }
};

const suspendAdmin = async (adminId: string) => {
  try {
    const updated = await Admin.findByIdAndUpdate(
      adminId,
      { suspended: true },
      { new: true }
    );
    if (!updated) {
      return { success: false, message: "Admin not found" };
    }
    return {
      success: true,
      message: "Admin suspended successfully",
      data: updated,
    };
  } catch (error) {
    console.error("Error suspending admin:", error);
    return { success: false, message: "Failed to suspend admin" };
  }
};

const reinstateAdmin = async (adminId: string) => {
  try {
    const updated = await Admin.findByIdAndUpdate(
      adminId,
      { suspended: false },
      { new: true }
    );
    if (!updated) {
      return { success: false, message: "Admin not found" };
    }
    return {
      success: true,
      message: "Admin reinstated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("Error reinstating admin:", error);
    return { success: false, message: "Failed to reinstate admin" };
  }
};

export const adminServices = {
  adminExists,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdminById,
  suspendAdmin,
  reinstateAdmin,
};
