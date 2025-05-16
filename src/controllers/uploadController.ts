import { Request, Response } from 'express';

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new Error('No file uploaded');
  }

  return {
    message: 'Image uploaded successfully',
    filename: req.file.filename,
  };
};
