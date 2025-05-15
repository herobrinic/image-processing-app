import express from 'express';
import { resizeImageHandler } from '../controllers/imageController';


const router = express.Router();

router.get('/', resizeImageHandler);

export default router;
