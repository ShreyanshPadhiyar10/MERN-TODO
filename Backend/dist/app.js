"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
const allowedOrigins = [
    "http://localhost:5173", // Local Vite frontend
    "https://mern-todo-pink.vercel.app" // Deployed frontend
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use((req, res, next) => {
    var _a;
    const origin = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.origin;
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
app.use(express_1.default.json({ limit: "20kb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/todo", todo_routes_1.default);
//# sourceMappingURL=app.js.map