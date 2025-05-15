import supertest from 'supertest';
import path from 'path';
import app from '../src/app';

describe('Upload Endpoint', () => {
  let request: ReturnType<typeof supertest>;

  beforeAll(() => {
    request = supertest(app);
  });

  it('should upload an image successfully', async () => {
    const res = await request
      .post('/api/upload')
      .attach('image', path.join(__dirname, 'test.jpg'));

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Image uploaded successfully');
  });

  it('should reject invalid file type', async () => {
    const res = await request
      .post('/api/upload')
      .attach('image', path.join(__dirname, 'test.txt'));

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
