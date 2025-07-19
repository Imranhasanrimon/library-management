import { Request, Response } from "express";

const handleNotFound = (req: Request, res: Response) => {
    res.status(404).json({
        message: "API Not Found",
        success: false,
        error: {
            path: req.originalUrl,
            method: req.method
        }
    });
};

export default handleNotFound;
