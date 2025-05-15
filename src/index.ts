// src/index.ts (add after all app.use() for routes)

import express from 'express';
import imageRoutes from './routes/imageRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Existing middlewares and routes
app.use('/api/images', imageRoutes);
app.use('/api/upload', uploadRoutes);

// Add error handler middleware as the last middleware
app.use(errorHandler);

export default app;
