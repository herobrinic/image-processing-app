"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        const filename = req.file.filename;
        res.status(200).json({ message: 'Upload successful', filename });
    }
    catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.uploadImage = uploadImage;
