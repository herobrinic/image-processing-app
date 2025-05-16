"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const resizeImage = async (filepath) => {
    const outputDir = path_1.default.join(__dirname, '../../public/uploads');
    const outputFilename = `resized-${path_1.default.basename(filepath)}`;
    const outputPath = path_1.default.join(outputDir, outputFilename);
    await (0, sharp_1.default)(filepath)
        .resize(200, 200)
        .toFile(outputPath);
    return outputFilename;
};
exports.resizeImage = resizeImage;
