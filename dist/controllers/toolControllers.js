"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTool = exports.deleteTool = exports.editTool = exports.getAllTools = exports.addTool = void 0;
const aiToolServices_1 = require("../services/aiToolServices");
const addTool = async (req, res) => {
    const toolData = req.body;
    try {
        const result = await aiToolServices_1.toolServices.addTool({
            ...toolData,
            deleted: false,
        });
        if (!result.success) {
            res.status(400).json({ error: "Failed to add tool" });
            return;
        }
        res.status(201).json(result);
        return;
    }
    catch (error) {
        console.error("Error adding tool:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.addTool = addTool;
const getAllTools = async (_req, res) => {
    try {
        const tools = await aiToolServices_1.toolServices.getAllTools();
        if (!tools.success) {
            res.status(400).json(tools);
            return;
        }
        res.status(200).json(tools);
        return;
    }
    catch (error) {
        console.error("Error fetching tools:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.getAllTools = getAllTools;
const editTool = async (req, res) => {
    const { toolId } = req.params;
    const toolData = req.body;
    try {
        const result = await aiToolServices_1.toolServices.editTool(toolId, toolData);
        if (!result.success) {
            res.status(400).json(result);
            return;
        }
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error("Error editting tool:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.editTool = editTool;
const deleteTool = async (req, res) => {
    const { toolId } = req.params;
    try {
        const result = await aiToolServices_1.toolServices.deleteTool(toolId);
        if (!result.success) {
            res.status(400).json(result);
            return;
        }
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error("Error deleting tool:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.deleteTool = deleteTool;
const getTool = async (req, res) => {
    const { toolId } = req.params;
    try {
        const tool = await aiToolServices_1.toolServices.getToolById(toolId);
        if (!tool.success) {
            res.status(400).json(tool);
            return;
        }
        res.status(200).json(tool);
        return;
    }
    catch (error) {
        console.error("Error fetching tool detail:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
exports.getTool = getTool;
