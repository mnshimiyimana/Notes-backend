import express from "express";
import cors from "cors";
import "dotenv/config";
import noteRoutes from "./routes/noteRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/notes", noteRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use(errorHandler);

export default app;
