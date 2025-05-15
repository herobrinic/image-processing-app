import { transform } from '../src/utils/imageProcessor';

describe('Image Processing', () => {
  it('should resize image without throwing', async () => {
    const testPath = './images/sample.jpg';
    const outputPath = './thumb/sample_100x100.jpg';
    await expectAsync(transform(testPath, 100, 100, outputPath)).toBeResolved();
  });
});
