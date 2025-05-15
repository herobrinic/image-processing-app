"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../images')));
app.use('/api/upload', uploadRoutes_1.default);
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
exports.default = app;
