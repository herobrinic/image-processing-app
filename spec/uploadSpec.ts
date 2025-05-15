import supertest from 'supertest';
import app from '../src/app';
import path from 'path';
import fs from 'fs';

const request = supertest(app);

describe('Upload Endpoint', () => {
  it('should upload an image successfully', async () => {
    const imagePath = path.join(__dirname, 'test-files/sample.jpg');
    const res = await request.post('/api/upload')
      .attach('image', imagePath);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('filename');
  });

  it('should reject invalid file type', async () => {
    const pdfPath = path.join(__dirname, 'test-files/sample.pdf');
    const res = await request.post('/api/upload')
      .attach('image', pdfPath);
    expect(res.status).toBe(400);
  });
});
