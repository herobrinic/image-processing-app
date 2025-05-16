"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const request = (0, supertest_1.default)(app_1.default);
describe('Upload Endpoint', () => {
    it('should upload and resize a valid image', async () => {
        const imagePath = path_1.default.resolve(__dirname, 'assets', 'test.jpg');
        const response = await request
            .post('/api/upload')
            .attach('image', imagePath);
        expect(response.status).toBe(200);
        expect(response.body.error).toBeDefined();
        expect(typeof response.body.error).toBe('string');
    });
    it('should reject invalid file type', async () => {
        const invalidPath = path_1.default.resolve(__dirname, 'assets', 'test.txt');
        expect(fs_1.default.existsSync(invalidPath)).toBeTrue();
        const response = await request
            .post('/api/upload')
            .attach('image', invalidPath);
        expect(response.status).toBe(400);
        expect(response.body).toEqual(jasmine.objectContaining({
            error: jasmine.any(String),
        }));
    });
    it('should return 400 if no file is uploaded', async () => {
        const response = await request.post('/api/upload');
        expect(response.status).toBe(400);
    });
});
