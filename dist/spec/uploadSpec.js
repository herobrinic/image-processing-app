"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const request = (0, supertest_1.default)(app_1.default);
describe('Upload Endpoint', () => {
    const testImagePath = path_1.default.join(__dirname, 'test.jpg');
    const testTxtPath = path_1.default.join(__dirname, 'test.txt');
    beforeAll(() => {
        // Ensure test image exists
        if (!fs_1.default.existsSync(testImagePath)) {
            throw new Error(`Test image not found at ${testImagePath}. Please add a test.jpg file to the spec folder.`);
        }
        // Create dummy text file if missing
        if (!fs_1.default.existsSync(testTxtPath)) {
            fs_1.default.writeFileSync(testTxtPath, 'This is not an image.');
        }
    });
    it('should upload an image successfully', async () => {
        const res = await request
            .post('/api/upload')
            .attach('image', testImagePath);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Image uploaded successfully');
    });
    it('should reject invalid file type', async () => {
        const res = await request
            .post('/api/upload')
            .attach('image', testTxtPath);
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });
});
