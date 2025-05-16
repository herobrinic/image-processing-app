import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const resizeImage = async (filepath: string): Promise<string> => {
  const outputDir = path.join(__dirname, '../../public/uploads');
  const outputFilename = `resized-${path.basename(filepath)}`;
  const outputPath = path.join(outputDir, outputFilename);

  await sharp(filepath)
    .resize(200, 200)
    .toFile(outputPath);

  return outputFilename;
};
