import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema: any = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        index: true
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

userSchema.pre("save", async function (this: any, next: any) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 5)
    next()
});

type comparePasswordFunction = (
    password: string,
) => void

const isPasswordCorrect: comparePasswordFunction = async function (this: any, password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.isPasswordCorrect = isPasswordCorrect

userSchema.methods.generateAccessToken = function () {
    const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName
        },
        accessTokenSecret,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    const refreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRET
    return jwt.sign(
        {
            _id: this._id
        },
        refreshTokenSecret,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)