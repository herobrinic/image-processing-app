import express from 'express';
import path from 'path';
import imageRoutes from './routes/imageRoutes';
import uploadRoutes from './routes/uploadRoutes';


const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/images', imageRoutes);
app.use('/api/upload', uploadRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
