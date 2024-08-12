import dotenv from "dotenv";
import { app } from "./app";
import { DBConnect } from "./db/connection";

dotenv.config({
    path: "./env"
})

DBConnect()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`)
        })
    })
    .catch((err: any) => console.log("Connection error", err));