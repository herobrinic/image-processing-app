import express from 'express';
import path from 'path';
import uploadRoutes from './routes/uploadRoutes';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use('/api/upload', uploadRoutes);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
