"use strict";
// src/middleware/validateQuery.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResizeQuery = validateResizeQuery;
function validateResizeQuery(req, res, next) {
    const { filename, width, height } = req.query;
    if (!filename || typeof filename !== 'string') {
        res.status(400).json({ success: false, message: 'filename is required' });
        return;
    }
    const widthNum = Number(width);
    const heightNum = Number(height);
    if (isNaN(widthNum) || isNaN(heightNum) || widthNum <= 0 || heightNum <= 0) {
        res.status(400).json({ success: false, message: 'width and height must be positive numbers' });
        return;
    }
    next();
}
