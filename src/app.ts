import express from "express";
import path from "path";
import imageRoutes from "./routes/imageRoutes";
import uploadRoutes from "./routes/uploadRoutes";

const app = express();

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images) from 'public' folder
app.use(express.static(path.join(__dirname, "../public")));

// Use routes with /api prefix
app.use("/api/images", imageRoutes);
app.use("/api/upload", uploadRoutes);

export default app;
