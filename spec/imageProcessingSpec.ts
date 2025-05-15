import path from 'path';
import fs from 'fs';
import { transform } from '../src/utils/imageProcessor';

describe('Image Processing', () => {
  const inputPath = path.join(__dirname, 'test.jpg');
  const outputPath = path.join(__dirname, 'resized.jpg');

  beforeAll(() => {
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Test image not found at ${inputPath}. Please add a test.jpg file to the spec folder.`);
    }
  });

  afterAll(() => {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  it('should resize the image', async () => {
    await transform(inputPath, outputPath, 200, 200);

    expect(fs.existsSync(outputPath)).toBe(true);
  });
});
