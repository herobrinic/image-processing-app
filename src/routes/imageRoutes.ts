// src/routes/imageRoutes.ts

import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const router = express.Router();

const imagesDir = path.join(__dirname, '../../uploads');
const resizedDir = path.join(__dirname, '../../resized');

// Ensure the resized directory exists
if (!fs.existsSync(resizedDir)) {
  fs.mkdirSync(resizedDir);
}

router.get('/api/images', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (!filename || isNaN(width) || isNaN(height)) {
    res.status(400).send('Missing or invalid parameters. Please provide filename, width, and height.');
    return;
  }

  const inputPath = path.join(imagesDir, `${filename}.jpg`);
  const outputPath = path.join(resizedDir, `${filename}_${width}x${height}.jpg`);

  try {
    if (fs.existsSync(outputPath)) {
      res.sendFile(outputPath);
      return;
    }

    if (!fs.existsSync(inputPath)) {
      res.status(404).send('Original image not found.');
      return;
    }

    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);

    res.sendFile(outputPath);
  } catch (error) {
    res.status(500).send('Error processing the image.');
  }
});

export default router;
