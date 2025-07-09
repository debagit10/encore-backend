"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const adminRoutes_1 = require("./routes/adminRoutes");
const toolRoutes_1 = require("./routes/toolRoutes");
const categoryRoutes_1 = require("./routes/categoryRoutes");
const reviewRoutes_1 = require("./routes/reviewRoutes");
const uploadImage_1 = require("./utils/uploadImage");
const editProfile_1 = require("./utils/editProfile");
const top5Tools_1 = require("./utils/metrics/top5Tools");
const top5Categories_1 = require("./utils/metrics/top5Categories");
const recentlyAdded_1 = require("./utils/metrics/recentlyAdded");
const trackVisits_1 = require("./utils/trackVisits");
const topVisitedTools_1 = require("./utils/metrics/topVisitedTools");
const upload_1 = __importDefault(require("./utils/file-upload/upload"));
const importTools_1 = require("./utils/file-upload/importTools");
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/admin", adminRoutes_1.adminRoutes);
app.use("/api/tool", toolRoutes_1.toolRoutes);
app.use("/api/category", categoryRoutes_1.categoryRoutes);
app.use("/api/review", reviewRoutes_1.reviewRoutes);
app.post("/api/upload-image", uploadImage_1.uploadMiddleware, uploadImage_1.uploadImage);
app.put("/api/edit-profile/:userId", editProfile_1.updateProfile);
app.get("/api/top-tools", top5Tools_1.getTop5Tools);
app.get("/api/top-categories", top5Categories_1.getTopCategories);
app.get("/api/recent-tools", recentlyAdded_1.recentTools);
app.get("/api/top-visited", topVisitedTools_1.topVisited);
app.post("/api/track-visits/:toolId", trackVisits_1.trackVisits);
app.post("/api/import-tools/", upload_1.default.single("file"), importTools_1.importTools);
app.get("/", (_req, res) => {
    res.status(200).json({ message: "Encore AI backend server live" });
});
exports.default = app;
