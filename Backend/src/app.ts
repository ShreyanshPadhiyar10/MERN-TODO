import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import { DBConnect } from "./db/connection";

export const app = express()

app.use(cors({
    origin: "https://mern-todo-pink.vercel.app",
    credentials: true,
}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://mern-todo-pink.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    next();
});


app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

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

import userRouter from "./routes/user.routes"
import todoRouter from "./routes/todo.routes"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/todo", todoRouter)

// export { app }