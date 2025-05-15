"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const resizeImage = async (inputPath, width, height) => {
    const outputFilename = `resized-${Date.now()}${path_1.default.extname(inputPath)}`;
    const outputPath = path_1.default.join(path_1.default.dirname(inputPath), outputFilename);
    await (0, sharp_1.default)(inputPath)
        .resize(width, height)
        .toFile(outputPath);
    return outputPath;
};
exports.resizeImage = resizeImage;
