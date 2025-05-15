import path from 'path';
import { transform } from '../src/utils/imageProcessor';

describe('Image Processing', () => {
  it('should resize the image', async () => {
    const width = parseInt('200');
    const height = parseInt('200');
    // Provide output path - usually something in your temp or test folder
    const outputPath = path.resolve(__dirname, '../temp/fjord_200x200.jpg');

    const output = await transform('fjord', width, height, outputPath);

    expect(output).toBe(outputPath);
  });
});
