"use strict";
// src/routes/imageRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const router = express_1.default.Router();
const imagesDir = path_1.default.join(__dirname, '../../uploads');
const resizedDir = path_1.default.join(__dirname, '../../resized');
// Ensure the resized directory exists
if (!fs_1.default.existsSync(resizedDir)) {
    fs_1.default.mkdirSync(resizedDir);
}
router.get('/api/images', async (req, res) => {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (!filename || isNaN(width) || isNaN(height)) {
        res.status(400).send('Missing or invalid parameters. Please provide filename, width, and height.');
        return;
    }
    const inputPath = path_1.default.join(imagesDir, `${filename}.jpg`);
    const outputPath = path_1.default.join(resizedDir, `${filename}_${width}x${height}.jpg`);
    try {
        if (fs_1.default.existsSync(outputPath)) {
            res.sendFile(outputPath);
            return;
        }
        if (!fs_1.default.existsSync(inputPath)) {
            res.status(404).send('Original image not found.');
            return;
        }
        await (0, sharp_1.default)(inputPath)
            .resize(width, height)
            .toFile(outputPath);
        res.sendFile(outputPath);
    }
    catch (error) {
        res.status(500).send('Error processing the image.');
    }
});
exports.default = router;
