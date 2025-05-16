import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const router = express.Router();

// Multer config
const storage = multer.memoryStorage();
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

const upload = multer({ storage, fileFilter });

router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided or invalid file type' });
    }

    const filename = `${Date.now()}-${req.file.originalname}`;
    const outputPath = path.join(__dirname, '../../uploads', filename);

    await sharp(req.file.buffer)
      .resize(200, 200)
      .toFile(outputPath);

    return res.status(200).json({ message: 'Image uploaded and resized successfully', filename });
  } catch (err) {
    return res.status(500).json({ error: 'Server error during upload' });
  }
});

export default router;
