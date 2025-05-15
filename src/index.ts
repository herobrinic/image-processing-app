import express from 'express';
import path from 'path';
import imageRoutes from './routes/imageRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { errorHandler } from './middleware/errorHandler';
import { sanitizeQueryParams } from './middleware/sanitizeInput';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve public folder statically for frontend files like index.html, CSS, JS
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve uploads folder statically for serving uploaded images
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Parse JSON bodies
app.use(express.json());

// API routes
app.use('/images', imageRoutes);
app.use('/api/upload', uploadRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

