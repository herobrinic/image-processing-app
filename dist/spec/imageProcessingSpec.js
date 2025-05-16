"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// spec/imageProcessingSpec.ts
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
describe('Image Processing', () => {
    const inputPath = path_1.default.join(__dirname, '../uploads/test.jpg');
    const outputPath = path_1.default.join(__dirname, '../resized/test_200x200.jpg');
    it('should resize an image and save it to the resized directory', async () => {
        // Make sure the input image exists
        expect(fs_1.default.existsSync(inputPath)).toBeTrue();
        // Remove old resized image if exists
        if (fs_1.default.existsSync(outputPath))
            fs_1.default.unlinkSync(outputPath);
        await (0, sharp_1.default)(inputPath).resize(200, 200).toFile(outputPath);
        // Validate output
        expect(fs_1.default.existsSync(outputPath)).toBeTrue();
    });
});
