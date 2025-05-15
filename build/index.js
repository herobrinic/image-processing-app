"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const sanitizeInput_1 = require("./middleware/sanitizeInput");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(sanitizeInput_1.sanitizeQueryParams);
app.use('/api/upload', uploadRoutes_1.default);
app.use('/api/images', imageRoutes_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
