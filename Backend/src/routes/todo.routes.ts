import { Router } from "express";
import { createTodo, getTodos, updateTodo } from "../controllers/todo.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();
router.use(verifyJWT)

router.route("/createTodo").post(createTodo)

router.route("/fetch-todos").get(getTodos)

router.route("/update").patch(updateTodo);

export default router