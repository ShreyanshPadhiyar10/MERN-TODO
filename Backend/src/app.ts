import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


import userRouter from "./routes/user.routes"
import todoRouter from "./routes/todo.routes"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/todo", todoRouter)

export { app }