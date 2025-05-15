import { Request, Response } from 'express';
import { processImage } from '../services/imageService';


export const resizeImageHandler = async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;

  if (!filename || !width || !height) {
    return res.status(400).send('Missing required query parameters');
  }

  const parsedWidth = parseInt(width as string, 10);
  const parsedHeight = parseInt(height as string, 10);

  if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
    return res.status(400).send('Width and height must be numbers');
  }

  try {
    const processedImagePath = await processImage(
      filename as string,
      parsedWidth,
      parsedHeight
    );
    res.sendFile(processedImagePath);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
