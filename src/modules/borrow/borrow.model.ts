import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>(
    {
        book: { type: Schema.Types.ObjectId, required: true },              //ref:"Book"
        quantity: { type: Number, required: true, min: 1 },
        dueDate: { type: Date, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Borrow = model<IBorrow>("Borrow", borrowSchema);
export default Borrow;