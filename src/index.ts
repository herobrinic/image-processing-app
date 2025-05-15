import express from 'express';
import imageRoutes from './routes/imageRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { errorHandler } from './middleware/errorHandler';
import { sanitizeQueryParams } from './middleware/sanitizeInput';

const app = express();

app.use(express.json());
app.use(sanitizeQueryParams);  // Sanitize all query params globally
app.use('/images', imageRoutes);
app.use('/upload', uploadRoutes);

app.use(errorHandler);  // Error handler last

export default app;
