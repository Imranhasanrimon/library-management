import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";

    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = "Validation failed";
    }

    res.status(statusCode).json({
        message,
        success: false,
        error: err,
    });
};
