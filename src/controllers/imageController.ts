import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const filePath = path.join(__dirname, '../../uploads', req.file.filename);

    // Optional: check if file was saved correctly
    if (!fs.existsSync(filePath)) {
      res.status(500).json({ error: 'File upload failed' });
      return;
    }

    res.status(200).json({
      message: 'Image uploaded successfully',
      filename: req.file.filename,
    });
  } catch (error) {
    next(error);
  }
};
