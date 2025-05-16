import request from 'supertest';
import app from '../src/app'; // Adjust path if needed
import path from 'path';

describe('Upload Endpoint', () => {
  const testImagePath = path.join(__dirname, 'test.jpg');

  it('should upload an image successfully', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('image', testImagePath);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Image uploaded successfully');
    expect(response.body.filename).toBeDefined();
  });

  it('should reject invalid file type', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('image', path.join(__dirname, 'test.txt')); // Invalid file type

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});