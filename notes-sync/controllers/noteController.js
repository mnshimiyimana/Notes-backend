import asyncHandler from "express-async-handler";
import { Note } from "../models/index.js";
import * as socketManager from "../utils/socketManager.js";
import { ApiError } from "../middlewares/errorHandler.js";

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.findAll({
    order: [["updatedAt", "DESC"]],
  });

  res.status(200).json({
    status: "success",
    count: notes.length,
    data: notes,
  });
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, clientId, createdAt, updatedAt } = req.body;

  const existingNote = await Note.findOne({ where: { clientId } });

  if (existingNote) {
    return res.status(200).json({
      status: "success",
      message: "Note already exists",
      data: existingNote,
    });
  }

  const newNote = await Note.create({
    title,
    content,
    clientId,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
    syncedAt: new Date(),
  });

  socketManager.emitNoteCreated(newNote);

  res.status(201).json({
    status: "success",
    data: newNote,
  });
});

const createBatchNotes = asyncHandler(async (req, res) => {
  const notes = req.body;

  if (!Array.isArray(notes) || notes.length === 0) {
    throw new ApiError("Request body must be a non-empty array of notes", 400);
  }

  const results = {
    created: [],
    existing: [],
  };

  for (const noteData of notes) {
    const { title, content, clientId, createdAt, updatedAt } = noteData;

    try {
      const [note, created] = await Note.findOrCreate({
        where: { clientId },
        defaults: {
          title,
          content,
          clientId,
          createdAt: createdAt || new Date(),
          updatedAt: updatedAt || new Date(),
          syncedAt: new Date(),
        },
      });

      if (created) {
        results.created.push(note);
      } else {
        results.existing.push(note);
      }
    } catch (error) {
      console.error(`Error processing note with clientId ${clientId}:`, error);
    }
  }

  if (results.created.length > 0) {
    socketManager.emitBatchSynced(results.created);
  }

  res.status(200).json({
    status: "success",
    message: `Processed ${notes.length} notes. Created: ${results.created.length}, Already existing: ${results.existing.length}`,
    data: results,
  });
});

export { getAllNotes, createNote, createBatchNotes };
