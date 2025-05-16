"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploadController_1 = require("../controllers/uploadController");
const router = express_1.default.Router();
const uploadDir = path_1.default.join(__dirname, '../../images');
// Ensure the directory exists
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (_req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        cb(null, allowedTypes.includes(file.mimetype));
    },
});
router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        const response = await (0, uploadController_1.uploadImage)(req, res);
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
