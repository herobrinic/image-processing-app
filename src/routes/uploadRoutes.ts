import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { resizeImage } from '../services/imageService';

const router = express.Router();

const uploadsDir = path.join(__dirname, '../../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const width = parseInt(req.body.width);
      const height = parseInt(req.body.height);

      if (isNaN(width) || isNaN(height)) {
        return res.status(400).json({ error: 'Invalid width or height' });
      }

      const resizedImagePath = await resizeImage(req.file.path, width, height);

      return res.status(200).json({
        resizedImagePath: `/uploads/${path.basename(resizedImagePath)}`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

export default router;
