import path from 'path';
import { transform } from '../src/utils/imageProcessor';

describe('Image Processing', () => {
  const fullPath = path.resolve(__dirname, '../src/assets/full/fjord.jpg');
  const thumbPath = path.resolve(__dirname, '../src/assets/thumb/fjord_200x200.jpg');

  it('should resize the image', async () => {
    const width = 200;
    const height = 200;
    const result = await transform(fullPath, width, height, thumbPath);
    expect(result).toBeTruthy();
  });
});
