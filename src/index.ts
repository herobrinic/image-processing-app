import express from 'express';
import path from 'path';
import uploadRoutes from './routes/uploadRoutes';
import imageRoutes from './routes/imageRoutes';
import { errorHandler } from './middleware/errorHandler';
import { sanitizeQueryParams } from './middleware/sanitizeInput';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Use the imageRoutes
app.use('/', imageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
