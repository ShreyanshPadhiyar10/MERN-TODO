import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express()

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


import userRouter from "./routes/user.routes"
import todoRouter from "./routes/todo.routes"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/todo", todoRouter)

export { app }