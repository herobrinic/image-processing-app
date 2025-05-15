"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = transform;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
async function transform(inputPath, width, height, outputPath) {
    if (!fs_1.default.existsSync(inputPath)) {
        throw new Error('Input file does not exist.');
    }
    await (0, sharp_1.default)(inputPath)
        .resize(width, height)
        .toFile(outputPath);
}
