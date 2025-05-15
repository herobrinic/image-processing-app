// src/middleware/validateQuery.ts

import { Request, Response, NextFunction } from 'express';

export function validateResizeQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { filename, width, height } = req.query;

  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ success: false, message: 'filename is required' });
  }

  const widthNum = Number(width);
  const heightNum = Number(height);

  if (isNaN(widthNum) || isNaN(heightNum) || widthNum <= 0 || heightNum <= 0) {
    return res.status(400).json({ success: false, message: 'width and height must be positive numbers' });
  }

  next();
}
