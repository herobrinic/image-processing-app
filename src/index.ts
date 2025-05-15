import express from 'express';
import path from 'path';
import uploadRoutes from './routes/uploadRoutes';
import imageRoutes from './routes/imageRoutes';
import { errorHandler } from './middleware/errorHandler';
import { sanitizeQueryParams } from './middleware/sanitizeInput';

const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend HTML/CSS
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/', imageRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
