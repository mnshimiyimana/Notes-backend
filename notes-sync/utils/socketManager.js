import { Server } from "socket.io";
import "dotenv/config";

let io;

const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

const emitNoteCreated = (note) => {
  if (io) {
    io.emit("note:created", note);
    console.log(`Emitted note:created for note ID: ${note.id}`);
  }
};

const emitNoteSynced = (note) => {
  if (io) {
    io.emit("note:synced", note);
    console.log(`Emitted note:synced for note ID: ${note.id}`);
  }
};

const emitBatchSynced = (notes) => {
  if (io) {
    io.emit("notes:batch-synced", notes);
    console.log(`Emitted notes:batch-synced for ${notes.length} notes`);
  }
};

const getIO = () => io;

export { init, emitNoteCreated, emitNoteSynced, emitBatchSynced, getIO };
