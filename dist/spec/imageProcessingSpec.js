"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const imageProcessor_1 = require("../src/utils/imageProcessor");
describe('Image Processing', () => {
    it('should resize the image', async () => {
        const width = parseInt('200');
        const height = parseInt('200');
        // Provide output path - usually something in your temp or test folder
        const outputPath = path_1.default.resolve(__dirname, '../temp/fjord_200x200.jpg');
        const output = await (0, imageProcessor_1.transform)('fjord', width, height, outputPath);
        expect(output).toBe(outputPath);
    });
});
