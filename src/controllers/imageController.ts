import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { resizeImage } from '../services/imageService';

export const resizeImageHandler = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { filename, width, height } = req.query;

    if (!filename || !width || !height) {
      return res.status(400).json({ message: 'Missing required query parameters' });
    }

    const widthInt = parseInt(width as string);
    const heightInt = parseInt(height as string);

    if (isNaN(widthInt) || isNaN(heightInt)) {
      return res.status(400).json({ message: 'Width and height must be valid numbers' });
    }

    const resizedImagePath = await resizeImage(filename as string, widthInt, heightInt);

    if (!fs.existsSync(resizedImagePath)) {
      return res.status(500).json({ message: 'Resized image not found after processing' });
    }

    return res.sendFile(path.resolve(resizedImagePath));
  } catch (error) {
    console.error('Error resizing image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
