"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app")); // Adjust path if needed
const path_1 = __importDefault(require("path"));
describe('Upload Endpoint', () => {
    const testImagePath = path_1.default.join(__dirname, 'test.jpg');
    it('should upload an image successfully', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/upload')
            .attach('image', testImagePath);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Image uploaded successfully');
        expect(response.body.filename).toBeDefined();
    });
    it('should reject invalid file type', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/upload')
            .attach('image', path_1.default.join(__dirname, 'test.txt')); // Invalid file type
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });
});
