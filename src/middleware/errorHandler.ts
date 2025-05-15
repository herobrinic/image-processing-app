// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
}

export function errorHandler(
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); // Log error for debugging

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
}
