import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        mongoose.connect(config.databaseUrl);
        console.log(`Database is connected Successfully.`);
    } catch (error) {
        console.log(`data base connection error:`, error);
        process.exit(1);
    };
};

export default connectDB;