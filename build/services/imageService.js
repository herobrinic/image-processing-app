"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = resizeImage;
// src/services/imageService.ts
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const outputDir = path_1.default.join(__dirname, '../../public/resized');
// Ensure the output directory exists
if (!fs_1.default.existsSync(outputDir)) {
    fs_1.default.mkdirSync(outputDir, { recursive: true });
}
function resizeImage(filename, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputPath = path_1.default.join(__dirname, '../../uploads', filename);
        const outputFilename = `${path_1.default.parse(filename).name}-${width}x${height}${path_1.default.extname(filename)}`;
        const outputPath = path_1.default.join(outputDir, outputFilename);
        // Check if image already exists
        if (fs_1.default.existsSync(outputPath)) {
            return outputPath;
        }
        yield (0, sharp_1.default)(inputPath).resize(width, height).toFile(outputPath);
        return outputPath;
    });
}
