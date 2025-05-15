"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("../src/app"));
describe('Upload Endpoint', () => {
    let request;
    beforeAll(() => {
        request = (0, supertest_1.default)(app_1.default);
    });
    it('should upload an image successfully', async () => {
        const res = await request
            .post('/api/upload')
            .attach('image', path_1.default.join(__dirname, 'test.jpg'));
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Image uploaded successfully');
    });
    it('should reject invalid file type', async () => {
        const res = await request
            .post('/api/upload')
            .attach('image', path_1.default.join(__dirname, 'test.txt'));
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });
});
