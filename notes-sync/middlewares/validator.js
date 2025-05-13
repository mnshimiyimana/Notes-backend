/**
 * Request validation middleware using Joi
 */
import Joi from "joi";

// Validation schema for a single note
const noteSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content cannot be empty",
    "any.required": "Content is required",
  }),
  clientId: Joi.string().uuid().required().messages({
    "string.guid": "Client ID must be a valid UUID",
    "any.required": "Client ID is required",
  }),
  createdAt: Joi.date().iso().messages({
    "date.format": "Created date must be in ISO format",
  }),
  updatedAt: Joi.date().iso().messages({
    "date.format": "Updated date must be in ISO format",
  }),
});

// Validation schema for batch notes
const batchNotesSchema = Joi.array().items(noteSchema).min(1).messages({
  "array.min": "At least one note is required for batch processing",
  "array.base": "Request body must be an array of notes",
});

/**
 * Middleware for validating a single note
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateNote = (req, res, next) => {
  const { error } = noteSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errorMessages,
    });
  }

  next();
};

/**
 * Middleware for validating batch notes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateBatchNotes = (req, res, next) => {
  const { error } = batchNotesSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      status: "error",
      message: "Batch validation failed",
      errors: errorMessages,
    });
  }

  next();
};

export { validateNote, validateBatchNotes };
