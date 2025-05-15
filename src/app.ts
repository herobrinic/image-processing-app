import express, { Request, Response } from 'express';
import path from 'path';
import imagesRouter from './routes/images';
import uploadRouter from './routes/upload';

const app = express();
const port = 3000;

// Middleware and routes
app.use('/api/images', imagesRouter);
app.use('/api/upload', uploadRouter);

// Example fixed GET route that was throwing the TS error
app.get('/api/test', (req: Request, res: Response): void => {
  if (!req.query.filename) {
    res.status(400).send('Filename required');
    return; // explicitly stop here, no returned value
  }

  // Other logic here, e.g.:
  res.send('Filename exists');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
