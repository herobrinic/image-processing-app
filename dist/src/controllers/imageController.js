"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImageHandler = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fullDir = path_1.default.resolve(__dirname, '../../full');
const thumbDir = path_1.default.resolve(__dirname, '../../thumb');
const resizeImageHandler = async (req, res) => {
    try {
        const filename = req.query.filename;
        const width = parseInt(req.query.width, 10);
        const height = parseInt(req.query.height, 10);
        if (!filename) {
            res.status(400).send('Filename is required');
            return;
        }
        if (isNaN(width) || isNaN(height)) {
            res.status(400).send('Width and height must be valid numbers');
            return;
        }
        const inputPath = path_1.default.join(fullDir, `${filename}.jpg`);
        const outputPath = path_1.default.join(thumbDir, `${filename}_${width}x${height}.jpg`);
        // Check if input file exists
        if (!fs_1.default.existsSync(inputPath)) {
            res.status(404).send('Image not found');
            return;
        }
        // If already resized image exists, send it
        if (fs_1.default.existsSync(outputPath)) {
            res.sendFile(outputPath);
            return;
        }
        // Resize and save the image
        await (0, sharp_1.default)(inputPath)
            .resize(width, height)
            .toFile(outputPath);
        // Send the resized image
        res.sendFile(outputPath);
    }
    catch (error) {
        console.error('Error in resizeImageHandler:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.resizeImageHandler = resizeImageHandler;
