"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const router = express_1.default.Router();
// Multer config
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    }
    else {
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file provided or invalid file type' });
            return;
        }
        const filename = `${Date.now()}-${req.file.originalname}`;
        const outputPath = path_1.default.join(__dirname, '../../uploads', filename);
        await (0, sharp_1.default)(req.file.buffer)
            .resize(200, 200)
            .toFile(outputPath);
        res.status(200).json({ message: 'Image uploaded and resized successfully', filename });
    }
    catch (err) {
        res.status(500).json({ error: 'Server error during upload' });
    }
});
exports.default = router;
