import mongoose from "mongoose"
import { DBName } from "../constants";

export const DBConnect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DBName}`)
        console.log("DATABASE CONNECTED SUCCESSFULLY.");
    } catch (error) {
        console.log("DATABASE CONNECTION FAILED.", error);
    }
}