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

const getAllBooks = async (req: Request, res: Response) => {
    const data = await Book.find()
    res.send({
        success: true,
        message: "Books retrieved successfully",
        data: data
    })
}

const getABook = async (req: Request, res: Response) => {
    const data = await Book.findById(req.params.bookId)
    res.send({
        success: true,
        message: "Book retrieved successfully",
        data: data
    })
}

const updateBook = async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const data = await Book.findByIdAndUpdate(bookId, req.body, { new: true })
    res.send({
        success: true,
        message: "Book updated successfully",
        data: data
    })
}

const deleteBook = async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    await Book.findByIdAndDelete(bookId)
    res.send({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
}

export const bookController = {
    createBook,
    getAllBooks,
    getABook,
    updateBook,
    deleteBook
}