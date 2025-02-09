"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.verifyJWT);
router.route("/createTodo").post(todo_controller_1.createTodo);
router.route("/fetch-todos").get(todo_controller_1.getTodos);
router.route("/update").patch(todo_controller_1.updateTodo);
exports.default = router;
//# sourceMappingURL=todo.routes.js.map