import { User } from "../models/user.model";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

interface tokens {
    accessToken: string;
    refreshToken: string;
}
const generateAccessAndRefreshToken = async (userId: string): Promise<tokens> => {
    try {
        const user = await User.findById(userId)

        const accessToken: string = user.generateAccessToken()
        const refreshToken: string = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: true })

        return { accessToken, refreshToken }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullName, password } = req.body

    if (!username || !email || !fullName || !password) {
        return res.status(400).send({ message: "All field are reuqired" })
    }

    const userExist = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userExist) {
        return res.status(400).send({ message: "User of this username or email already exist." })
    }

    const user = await User.create({
        username,
        email,
        fullName,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        return res.status(400).send({ message: "User creation failed." })
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, "User created successfully.", createdUser, true)
        )
})

const loginUser = asyncHandler(async (req, res) => {
    let { username, password } = req.body

    if (!username || !password) {
        return res.status(400).send({ message: "username or password is required." })
    }

    username = username.toLowerCase()
    const user = await User.findOne({ username })

    if (!user) {
        return res.status(404).send({ message: "Inavlid username." })
    }

    const isPasswordTrue = await user.isPasswordCorrect(password)
    if (!isPasswordTrue) {
        return res.status(400).send({ message: "Passowrd is incorrect." })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    return res
        .status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .json(
            new apiResponse(200, "User loggedin successfully", { accessToken, refreshToken })
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.body.user?._id,
        {
            $set: { refreshToken: undefined },
        },
        { new: true }
    )

    return res.status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(
            new apiResponse(200, "User logged out successfully.", {})
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const previousRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!previousRefreshToken) {
        return res.status(401).send({ message: "unothorized request" })
    }

    try {
        const refreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRET
        const decodedToken: any = jwt.verify(previousRefreshToken, refreshTokenSecret)

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            return res.status(401).send({ message: "Invalid refresh token" })
        }

        if (previousRefreshToken !== user.refreshToken) {
            return res.status(401).send({ message: "Refresh token was expired or already used" })
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", refreshToken)
            .json(
                new apiResponse(200, "refresh token generated successfully", {
                    accessToken,
                    refreshToken
                })
            )

    } catch (error) {
        res.status(401).send({ message: error })
    }
})

const currentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new apiResponse(200, "User fetched successfully", req.body.user)
        )
})

export { registerUser, generateAccessAndRefreshToken, loginUser, logoutUser, refreshAccessToken, currentUser }