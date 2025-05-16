import express, { Application } from 'express';
import path from 'path';
import uploadRoutes from './routes/uploadRoutes';

const app: Application = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', uploadRoutes);

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction): void => {
  res.status(500).json({ error: err.message });
});


if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
