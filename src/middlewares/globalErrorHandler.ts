import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";

    // Handle Mongoose Validation Error
    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = "Validation failed";
    }

    // Handle Mongoose Cast Error (like invalid ObjectId)
    else if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = "Invalid ID format";
    }

    // Handle general JS Error
    else if (err instanceof Error) {
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        error: {
            name: err.name,
            message: err.message,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        },
    });
};
