"use strict";
// src/routes/imageRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageController_1 = require("../controllers/imageController");
const validateQuery_1 = require("../middleware/validateQuery");
const router = express_1.default.Router();
router.get('/resize', validateQuery_1.validateResizeQuery, imageController_1.resizeImageHandler);
exports.default = router;
