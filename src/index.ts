import express from 'express';
import path from 'path';
import imageRoutes from './routes/imageRoutes';
import uploadRoutes from './routes/uploadRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Parse JSON bodies
app.use(express.json());

// API routes
app.use('/images', imageRoutes);
app.use('/api/upload', uploadRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
