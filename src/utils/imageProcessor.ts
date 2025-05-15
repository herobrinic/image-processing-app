import sharp from 'sharp';
import fs from 'fs';

export async function transform(
  inputPath: string,
  width: number,
  height: number,
  outputPath: string
): Promise<void> {
  if (!fs.existsSync(inputPath)) {
    throw new Error('Input file does not exist.');
  }

  await sharp(inputPath)
    .resize(width, height)
    .toFile(outputPath);
}
