// src/services/imageService.ts
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const outputDir = path.join(__dirname, '../../public/resized');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

export async function resizeImage(
	filename: string,
	width: number,
	height: number
): Promise<string> {
	const inputPath = path.join(__dirname, '../../uploads', filename);
	const outputFilename = `${path.parse(filename).name}-${width}x${height}${path.extname(filename)}`;
	const outputPath = path.join(outputDir, outputFilename);

	// Check if image already exists
	if (fs.existsSync(outputPath)) {
		return outputPath;
	}

	await sharp(inputPath).resize(width, height).toFile(outputPath);
	return outputPath;
}
