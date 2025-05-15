"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const uploadImage = (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    res.status(200).json({
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        message: 'File uploaded successfully',
    });
};
exports.uploadImage = uploadImage;
