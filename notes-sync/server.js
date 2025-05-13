import http from "http";
import "dotenv/config";
import app from "./app.js";
import * as socketManager from "./utils/socketManager.js";
import { sequelize, testConnection } from "./models/index.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

socketManager.init(server);

async function startServer() {
  try {
    await testConnection();

    await sequelize.sync();
    console.log("Database synced successfully");

    server.listen(PORT, () => {
      console.log(
        `Server running in ${
          process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );
      console.log(`- Health check: http://localhost:${PORT}/health`);
      console.log(`- API endpoint: http://localhost:${PORT}/notes`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});

startServer();
