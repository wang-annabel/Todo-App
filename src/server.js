import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// get file path from URL of current module
const __filename = fileURLToPath(import.meta.url);
// get directory name from file path
const __dirname = dirname(__filename);

// Middleware
// Serves the HTML file from /public directory
// tells express to serve all files from /public as static
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Serves up html file from /public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//auth routes
app.use("/auth", authRoutes); // all auth routes joined with '/auth'
app.use("/todos", authMiddleware, todoRoutes);

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
