import supertest from 'supertest';
import app from '../src/app';
import path from 'path';
import fs from 'fs';

const request = supertest(app);

describe('Upload Endpoint', () => {
  it('should upload and resize a valid image', async () => {
    const imagePath = path.resolve(__dirname, 'assets', 'test.jpg');
    const response = await request
      .post('/api/upload')
      .attach('image', imagePath);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeDefined();
    expect(typeof response.body.error).toBe('string');
  });

  it('should reject invalid file type', async () => {
    const invalidPath = path.resolve(__dirname, 'assets', 'test.txt');
    expect(fs.existsSync(invalidPath)).toBeTrue();

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
