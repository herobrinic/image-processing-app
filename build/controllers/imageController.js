"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImageHandler = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageService_1 = require("../services/imageService");
const resizeImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename, width, height } = req.query;
        if (!filename || !width || !height) {
            return res.status(400).json({ message: 'Missing required query parameters' });
        }
        const widthInt = parseInt(width);
        const heightInt = parseInt(height);
        if (isNaN(widthInt) || isNaN(heightInt)) {
            return res.status(400).json({ message: 'Width and height must be valid numbers' });
        }
        const resizedImagePath = yield (0, imageService_1.resizeImage)(filename, widthInt, heightInt);
        if (!fs_1.default.existsSync(resizedImagePath)) {
            return res.status(500).json({ message: 'Resized image not found after processing' });
        }
        return res.sendFile(path_1.default.resolve(resizedImagePath));
    }
    catch (error) {
        console.error('Error resizing image:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.resizeImageHandler = resizeImageHandler;
