// src/index.ts
import express from 'express';
import imageRoutes from './routes/imageRoutes';
import uploadRoutes from './routes/uploadRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/api/images', imageRoutes);
app.use('/api/uploads', uploadRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
