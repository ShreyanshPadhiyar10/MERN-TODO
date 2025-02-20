import dotenv from "dotenv";
import { app } from "./app";
import cors from "cors";
import { DBConnect } from "./db/connection";

dotenv.config({
    path: "./env"
})

app.use(cors({
    origin: "https://mern-todo-pink.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://mern-todo-pink.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.options("*", (req, res) => {
    res.status(204).end();
});

DBConnect()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`)
        })
    })
    .catch((err: any) => console.log("Connection error", err));