import { Request, Response } from 'express';

export const uploadImage = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  res.status(200).json({
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    message: 'File uploaded successfully',
  });
};
