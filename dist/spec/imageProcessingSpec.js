"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageProcessor_1 = require("../src/utils/imageProcessor");
describe('Image Processing', () => {
    const inputPath = path_1.default.join(__dirname, 'test.jpg');
    const outputPath = path_1.default.join(__dirname, 'resized.jpg');
    beforeAll(() => {
        if (!fs_1.default.existsSync(inputPath)) {
            throw new Error(`Test image not found at ${inputPath}. Please add a test.jpg file to the spec folder.`);
        }
    });
    afterAll(() => {
        if (fs_1.default.existsSync(outputPath)) {
            fs_1.default.unlinkSync(outputPath);
        }
    });
    it('should resize the image', async () => {
        await (0, imageProcessor_1.transform)(inputPath, outputPath, 200, 200);
        expect(fs_1.default.existsSync(outputPath)).toBe(true);
    });
});
