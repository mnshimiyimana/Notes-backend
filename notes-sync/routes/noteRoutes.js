import express from "express";
import {
  getAllNotes,
  createNote,
  createBatchNotes,
} from "../controllers/noteController.js";
import { validateNote, validateBatchNotes } from "../middlewares/validator.js";

const router = express.Router();

router.get("/", getAllNotes);

router.post("/", validateNote, createNote);

router.post("/batch", validateBatchNotes, createBatchNotes);

export default router;
