import mongoose from "mongoose";
import { nanoid } from "nanoid";

const TodoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Completed", "Pending"],
            trim: true,
        },
        uniqueID: {
            type: String,
            required: true,
            default: "Default",
            trim: true,
        },
    },
    { timestamps: true }
);

TodoSchema.pre("save", (next) => {
    this.uniqueID = nanoid(10);

    next();
});

export default Todo = mongoose.model("Todo", TodoSchema);
