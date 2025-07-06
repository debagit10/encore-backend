// controllers/toolImportController.ts
import xlsx from "xlsx";
import fs from "fs";
import AI_Tool from "../../models/aiToolModel";
import { Request, Response } from "express";
import Category from "../../models/categoryModels";

interface ToolRow {
  name: string;
  description: string;
  demo_url: string;
  image: string;
  category: string;
}

export const importTools = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
      return;
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const toolsToInsert = [];

    for (const row of sheetData as ToolRow[]) {
      const {
        name,
        description,
        demo_url,
        image,
        category: categoryName,
      } = row;

      if (!name || !categoryName) continue;

      let category = await Category.findOne({ name: categoryName.trim() });

      if (!category) {
        category = await Category.create({
          name: categoryName.trim(),
          description: `An initial description for ${categoryName}`,
        });
      }

      toolsToInsert.push({
        name,
        description,
        demo_url,
        image,
        category_id: category._id,
        deleted: false,
      });
    }

    await AI_Tool.insertMany(toolsToInsert);
    fs.unlinkSync(filePath);

    res.status(201).json({
      success: true,
      message: `${toolsToInsert.length} tools imported successfully.`,
    });
    return;
  } catch (error) {
    console.error("Error importing tools:", error);
    res.status(500).json({ success: false, message: "Import failed" });
    return;
  }
};
