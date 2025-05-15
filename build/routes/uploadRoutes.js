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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploadController_1 = require("../controllers/uploadController");
const router = express_1.default.Router();
// Set up Multer storage
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path_1.default.join(__dirname, '../../uploads'));
    },
    filename: function (_req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// POST /upload
router.post('/', upload.single('image'), resizeAndSaveImage);
function resizeAndSaveImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        try {
            yield (0, uploadController_1.uploadImage)(req, res);
        }
        catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
exports.default = router;
