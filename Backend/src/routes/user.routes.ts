import { Router } from "express";
import { currentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/current-user").get(verifyJWT, currentUser)

export default router