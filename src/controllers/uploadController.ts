import { Request, Response } from 'express';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const filename = req.file.filename;
    res.status(200).json({ message: 'Upload successful', filename });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
