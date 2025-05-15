import { Request, Response } from 'express';
import { resizeImage } from '../services/imageService';
import path from 'path';

export const resizeImageHandler = async (req: Request, res: Response): Promise<Response | void> => {
  const { filename, width, height } = req.query;

  if (!filename || !width || !height) {
    return res.status(400).json({ error: 'Missing query parameters: filename, width, and height are required' });
  }

  const widthNum = parseInt(width as string, 10);
  const heightNum = parseInt(height as string, 10);

  if (isNaN(widthNum) || isNaN(heightNum)) {
    return res.status(400).json({ error: 'Width and height must be valid numbers' });
  }

  try {
    const imagePath = await resizeImage(filename as string, widthNum, heightNum);
    return res.sendFile(path.resolve(imagePath));
  } catch (error) {
    console.error('Resize error:', error);
    return res.status(500).json({ error: 'Failed to resize image', details: (error as Error).message });
  }
};
