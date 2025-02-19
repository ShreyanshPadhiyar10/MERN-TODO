import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "https://mern-todo-pink.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.options("*", cors()); 
app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


import userRouter from "./routes/user.routes"
import todoRouter from "./routes/todo.routes"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/todo", todoRouter)

export { app }