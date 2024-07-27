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
            default:'Pending'
        },
        uniqueID: {
            type: String,
            required: true,
            default: "code",
            trim: true,
        },
    },
    { timestamps: true }
);

TodoSchema.pre("save", function(next){
    this.uniqueID = nanoid(10);

    next();
});

export const Todo = mongoose.model("Todo", TodoSchema);
