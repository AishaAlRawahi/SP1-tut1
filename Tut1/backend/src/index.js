// src/index.js
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./db.js";
import todoRoutes from "./routes/todoRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Vite + CRA
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/todos", todoRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// 404 + error
app.use(notFound);
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

connectDB(URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 API on http://localhost:${PORT}`)))
  .catch((e) => {
    console.error("DB connection failed", e);
    process.exit(1);
  });
