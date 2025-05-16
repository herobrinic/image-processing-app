// spec/imageProcessingSpec.ts
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

describe('Image Processing', () => {
  const inputPath = path.join(__dirname, '../uploads/test.jpg');
  const outputPath = path.join(__dirname, '../resized/test_200x200.jpg');

  it('should resize an image and save it to the resized directory', async () => {
    // Make sure the input image exists
    expect(fs.existsSync(inputPath)).toBeTrue();

    // Remove old resized image if exists
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    await sharp(inputPath).resize(200, 200).toFile(outputPath);

    // Validate output
    expect(fs.existsSync(outputPath)).toBeTrue();
  });
});
