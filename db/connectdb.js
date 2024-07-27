import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to Database !");
    } catch (err) {
        console.log("Error: ", err);
        process.exit(0);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();

        console.log("Disconnected from Database !");
    } catch (err) {
        console.log("Error: ", err);
        process.exit(0);
    }
};

export { connectDB, disconnectDB };
