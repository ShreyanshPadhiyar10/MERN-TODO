import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token: string = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(404).send({ message: "Invalid access token please login." })
        }

        const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET
        const decodedToken: any = jwt.verify(token, accessTokenSecret)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            return res.status(404).send({ message: "User not found cannot get access token." })
        }

        req.body.user = user
        next()
    } catch (error) {
        res.status(400).send({ message: "Invalid access token : " + error })
    }
})