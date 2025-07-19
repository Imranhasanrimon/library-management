import { Router } from "express";
import { bookController } from "./book.controller";

const bookRoute = Router();
bookRoute.post("/", bookController.createBook)
bookRoute.get("/:bookId", bookController.getABook)
bookRoute.get("/", bookController.getAllBooks)
bookRoute.put("/:bookId", bookController.updateBook)
bookRoute.delete("/:bookId", bookController.deleteBook)

export default bookRoute;