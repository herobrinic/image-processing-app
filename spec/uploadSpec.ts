import path from 'path';
import fs from 'fs';
import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app);

describe('Upload Endpoint', () => {
  const testImagePath = path.join(__dirname, 'test.jpg');
  const testTxtPath = path.join(__dirname, 'test.txt');

  beforeAll(() => {
    // Ensure test image exists
    if (!fs.existsSync(testImagePath)) {
      throw new Error(`Test image not found at ${testImagePath}. Please add a test.jpg file to the spec folder.`);
    }

    // Create dummy text file if missing
    if (!fs.existsSync(testTxtPath)) {
      fs.writeFileSync(testTxtPath, 'This is not an image.');
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
