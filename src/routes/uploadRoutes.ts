import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { resizeAndSaveImage } from '../controllers/uploadController';

const router = express.Router();

const uploadDir = path.join(__dirname, '../../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), resizeAndSaveImage);

export default router;
