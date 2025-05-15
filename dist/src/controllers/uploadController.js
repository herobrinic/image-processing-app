"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const path_1 = __importDefault(require("path"));
const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }
    const imagePath = path_1.default.join('images', req.file.filename);
    // You can also validate further or log
    return {
        message: 'Image uploaded successfully',
        filename: req.file.filename,
        path: imagePath,
    };
};
exports.uploadImage = uploadImage;
