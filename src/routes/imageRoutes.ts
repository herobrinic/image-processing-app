// src/routes/imageRoutes.ts

import express from 'express';
import { resizeImageHandler } from '../controllers/imageController';
import { validateResizeQuery } from '../middleware/validateQuery';

const router = express.Router();

router.get('/resize', validateResizeQuery, resizeImageHandler);

export default router;
