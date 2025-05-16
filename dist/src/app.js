"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./routes/images"));
const upload_1 = __importDefault(require("./routes/upload"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware and routes
app.use('/api/images', images_1.default);
app.use('/api/upload', upload_1.default);
// Example fixed GET route that was throwing the TS error
app.get('/api/test', (req, res) => {
    if (!req.query.filename) {
        res.status(400).send('Filename required');
        return; // explicitly stop here, no returned value
    }
    // Other logic here, e.g.:
    res.send('Filename exists');
});
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
exports.default = app;
