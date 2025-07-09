"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importTools = void 0;
// controllers/toolImportController.ts
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const aiToolModel_1 = __importDefault(require("../../models/aiToolModel"));
const categoryModels_1 = __importDefault(require("../../models/categoryModels"));
const importTools = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: "No file uploaded" });
            return;
        }
        const filePath = req.file.path;
        const workbook = xlsx_1.default.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const toolsToInsert = [];
        for (const row of sheetData) {
            const { name, description, demo_url, image, category: categoryName, } = row;
            if (!name || !categoryName)
                continue;
            let category = await categoryModels_1.default.findOne({ name: categoryName.trim() });
            if (!category) {
                category = await categoryModels_1.default.create({
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
        await aiToolModel_1.default.insertMany(toolsToInsert);
        fs_1.default.unlinkSync(filePath);
        res.status(201).json({
            success: true,
            message: `${toolsToInsert.length} tools imported successfully.`,
        });
        return;
    }
    catch (error) {
        console.error("Error importing tools:", error);
        res.status(500).json({ success: false, message: "Import failed" });
        return;
    }
};
exports.importTools = importTools;
