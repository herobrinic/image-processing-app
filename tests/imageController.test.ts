// tests/imageController.test.ts

import request from 'supertest';
import app from '../src/index';

describe('GET /api/images/resize', () => {
  it('should return 400 if no query params', async () => {
    const response = await request(app).get('/api/images/resize');
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  // Add more tests here for success, invalid params, etc.
});
