"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const imageProcessor_1 = require("../src/utils/imageProcessor");
describe('Image Processing', () => {
    const fullPath = path_1.default.resolve(__dirname, '../src/assets/full/fjord.jpg');
    const thumbPath = path_1.default.resolve(__dirname, '../src/assets/thumb/fjord_200x200.jpg');
    it('should resize the image', async () => {
        const width = 200;
        const height = 200;
        const result = await (0, imageProcessor_1.transform)(fullPath, width, height, thumbPath);
        expect(result).toBeTruthy();
    });
});
