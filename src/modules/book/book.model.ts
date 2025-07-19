import { Model, model, Schema } from "mongoose";
import { IBook, IBookMethods } from "./book.interface";

const bookSchema = new Schema<IBook, Model<IBook>, IBookMethods>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, required: true, enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"] },
        isbn: { type: String, unique: true, required: true },
        description: { type: String },
        copies: { type: Number, required: true, min: 0 },
        available: { type: Boolean, default: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

bookSchema.method("updateAvailability", function () {
    this.available = this.copies > 0;
})

const Book = model<IBook, Model<IBook, {}, IBookMethods>>("Book", bookSchema);
export default Book;