import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express()

const allowedOrigins = [
    "http://localhost:5173",  // Local Vite frontend
    "https://mern-todo-pink.vercel.app"  // Deployed frontend
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))
app.use((req, res, next) => {
    const origin: any = req?.headers?.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin); // ✅ Set the specific origin
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Handle preflight requests
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