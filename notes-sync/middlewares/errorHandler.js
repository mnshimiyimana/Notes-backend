class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let status = err.status || "error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    status = "fail";
    const errors = err.errors.map((e) => e.message);
    message = "Validation error";

    return res.status(statusCode).json({
      status,
      message,
      errors,
    });
  }

  const errorResponse = {
    status,
    message,
  };

  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

export { ApiError, errorHandler };
