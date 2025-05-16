import fs from 'fs';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadImage } from '../controllers/uploadController';

const router = express.Router();

const uploadDir = path.join(__dirname, '../../images');

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    cb(null, allowedTypes.includes(file.mimetype));
  },
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const response = await uploadImage(req, res);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
