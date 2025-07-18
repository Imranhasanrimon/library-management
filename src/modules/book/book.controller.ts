import { Request, Response } from "express";
import Book from "./book.model";

const createBook = async (req: Request, res: Response) => {
    const data = await Book.create(req.body)
    res.send({
        success: true,
        message: "Book created successfully",
        data: data
    })
}

export const bookController = {
    createBook,
}