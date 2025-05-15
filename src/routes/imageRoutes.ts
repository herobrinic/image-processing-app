import express from 'express';
import { resizeImageHandler } from '../controllers/imageController';

const router = express.Router();

// GET /api/images/resize?filename=example.jpg&width=300&height=200
router.get('/resize', resizeImageHandler);

export default router;
