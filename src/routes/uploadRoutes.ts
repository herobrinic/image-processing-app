import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const imageDir = path.join(__dirname, '..', 'images');
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, imageDir);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error('Only .jpg files are allowed'));
    }
    cb(null, true);
  }
});

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  return res.status(200).json({ message: 'Image uploaded successfully' });
});

export default router;
