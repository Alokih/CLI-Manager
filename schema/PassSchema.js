import mongoose from "mongoose";

const PassSchema = new mongoose.Schema(
    {
        websiteLink: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        uniqueName: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Password = mongoose.model("Password", PassSchema);
