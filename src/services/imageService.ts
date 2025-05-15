import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const fullDir = path.join(__dirname, '..', 'images');
const thumbsDir = path.join(__dirname, '..', 'thumbs');

if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir);

export const processImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const fullPath = path.join(fullDir, filename);
  const outputName = `${path.parse(filename).name}_${width}x${height}.jpg`;
  const outputPath = path.join(thumbsDir, outputName);

  if (!fs.existsSync(fullPath)) {
    throw new Error('Original image not found');
  }

  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  await sharp(fullPath)
    .resize(width, height)
    .jpeg()
    .toFile(outputPath);

  return outputPath;
};
