import express from 'express';
import path from 'path';
import uploadRoutes from './routes/uploadRoutes';
import imageRoutes from './routes/imageRoutes';


const app = express();

// Middleware
app.use(express.json());

// Static files
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/resized', express.static(path.join(__dirname, '../resized')));

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/images', imageRoutes);

// Health check
app.get('/', (_req, res) => {
  res.send('Image Processing API is running.');
});

export default app;
