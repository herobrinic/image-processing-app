"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Static files
app.use(express_1.default.static('public'));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use('/resized', express_1.default.static(path_1.default.join(__dirname, '../resized')));
// Routes
app.use('/api/upload', uploadRoutes_1.default);
app.use('/api/images', imageRoutes_1.default);
// Health check
app.get('/', (_req, res) => {
    res.send('Image Processing API is running.');
});
exports.default = app;
