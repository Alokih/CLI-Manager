import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database connected !");
    } catch (err) {
        console.log("Error connecting to DB: ", err.message);
        process.exit(0);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();

        console.log("Database disconnected !");
    } catch (err) {
        console.log("Error disconnecting from DB: ", err.message);
        process.exit(0);
    }
};

export { connectDB, disconnectDB };
