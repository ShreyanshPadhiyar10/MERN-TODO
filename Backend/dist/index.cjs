"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
import { app } from "./app";
import { DBConnect } from "./db/connection";
dotenv_1.default.config({
    path: "./env"
});
(0, DBConnect)()
    .then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
})
    .catch((err) => console.log("Connection error", err));
//# sourceMappingURL=index.js.map