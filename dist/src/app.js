"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/api', uploadRoutes_1.default);
// Error handler
app.use((err, _req, res, _next) => {
    res.status(500).json({ error: err.message });
});
if (require.main === module) {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}
exports.default = app;
