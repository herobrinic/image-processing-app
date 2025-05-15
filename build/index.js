"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const app = (0, express_1.default)();
// Middleware to parse JSON and form data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve frontend HTML/CSS
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// Serve uploaded images statically
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
// Routes
app.use('/', imageRoutes_1.default);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
