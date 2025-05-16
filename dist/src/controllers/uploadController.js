"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const uploadImage = async (req, res) => {
    if (!req.file) {
        throw new Error('No file uploaded');
    }
    return {
        message: 'Image uploaded successfully',
        filename: req.file.filename,
    };
};
exports.uploadImage = uploadImage;
