import { Request, Response } from "express"
import Borrow from "./borrow.model"
import Book from "../book/book.model"

const borrowABook = async (req: Request, res: Response) => {

    const borrowedBook = await Book.findById(req.body.book)

    if (!borrowedBook) {
        return res.status(404).json({
            message: "Book not found",
            success: false,
            data: null
        });
    }

    if (borrowedBook?.copies < req.body.quantity) {
        res.send({
            success: false,
            message: "Not enough copies available",
            data: null
        })
        return;
    }

    borrowedBook.copies -= req.body.quantity;
    borrowedBook.updateAvailability()
    await borrowedBook.save()

    const data = await Borrow.create(req.body)

    res.send({
        success: true,
        message: "Book borrowed Successfully",
        data: data
    })
}

const bookSummary = async (req: Request, res: Response) => {
    const data = await Borrow.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookInfo"
            }
        },
        {
            $unwind: "$bookInfo"
        },
        {
            $project: {
                book: {
                    title: "$bookInfo.title",
                    isbn: "$bookInfo.isbn",
                },
                totalQuantity: 1,
                _id: 0
            }
        }
    ])

    res.send({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: data
    })
}

export const borrowController = {
    borrowABook,
    bookSummary,
}