import { NextFunction, Request, Response } from "express";
import Book from "./book.model";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Book.create(req.body)
        res.status(201).send({
            success: true,
            message: "Book created successfully",
            data: data
        })
    } catch (error) {
        next(error)
    }
}

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filter, sortBy = "createdAt", sort, limit } = req.query;

        const query: Record<string, unknown> = {};
        if (filter) query.genre = filter;

        const data = await Book.find(query)
            .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
            .limit(Number(limit))

        res.send({
            success: true,
            message: "Books retrieved successfully",
            data: data
        })
    } catch (error) {
        next(error)
    }
}

const getABook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Book.findById(req.params.bookId)

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }

        res.send({
            success: true,
            message: "Book retrieved successfully",
            data: data
        })
    } catch (error) {
        next(error);
    }
}

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findByIdAndUpdate(bookId, req.body, { new: true })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Book not found to update",
                data: null,
            });
        }
        res.send({
            success: true,
            message: "Book updated successfully",
            data: data
        })
    } catch (error) {
        next(error)
    }
}

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        await Book.findByIdAndDelete(bookId)
        res.status(204).send({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error) {
        next(error)
    }
}

export const bookController = {
    createBook,
    getAllBooks,
    getABook,
    updateBook,
    deleteBook
}