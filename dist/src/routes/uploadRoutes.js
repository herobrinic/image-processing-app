"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uploadController_1 = require("../controllers/uploadController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Async handler to make controller compatible with Express's expected return type
const asyncHandler = (fn) => (req, res, next) => {
    void fn(req, res).catch(next);
};
router.post('/upload', upload.single('image'), asyncHandler(uploadController_1.uploadImage));
exports.default = router;
