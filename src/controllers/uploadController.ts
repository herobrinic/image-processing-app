import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  const imagePath = path.join('images', req.file.filename);

  // You can also validate further or log
  return {
    message: 'Image uploaded successfully',
    filename: req.file.filename,
    path: imagePath,
  };
};
