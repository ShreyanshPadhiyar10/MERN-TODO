"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.currentUser = exports.refreshAccessToken = exports.logoutUser = exports.loginUser = exports.generateAccessAndRefreshToken = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const apiResponse_1 = require("../utils/apiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessAndRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        yield user.save({ validateBeforeSave: true });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.generateAccessAndRefreshToken = generateAccessAndRefreshToken;
const registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, fullName, password } = req.body;
    if (!username || !email || !fullName || !password) {
        return res.status(400).send({ message: "All field are reuqired" });
    }
    const userExist = yield user_model_1.User.findOne({
        $or: [{ username }, { email }]
    });
    if (userExist) {
        return res.status(400).send({ message: "User of this username or email already exist." });
    }
    const user = yield user_model_1.User.create({
        username,
        email,
        fullName,
        password
    });
    const createdUser = yield user_model_1.User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        return res.status(400).send({ message: "User creation failed." });
    }
    return res
        .status(200)
        .json(new apiResponse_1.apiResponse(200, "User created successfully.", createdUser, true));
}));
exports.registerUser = registerUser;
const loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: "username or password is required." });
    }
    username = username.toLowerCase();
    const user = yield user_model_1.User.findOne({ username });
    if (!user) {
        return res.status(404).send({ message: "Inavlid username." });
    }
    const isPasswordTrue = yield user.isPasswordCorrect(password);
    if (!isPasswordTrue) {
        return res.status(400).send({ message: "Passowrd is incorrect." });
    }
    const { accessToken, refreshToken } = yield generateAccessAndRefreshToken(user._id);
    return res
        .status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .json(new apiResponse_1.apiResponse(200, "User loggedin successfully", { accessToken, refreshToken }, true));
}));
exports.loginUser = loginUser;
const logoutUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield user_model_1.User.findByIdAndUpdate((_a = req.body.user) === null || _a === void 0 ? void 0 : _a._id, {
        $set: { refreshToken: undefined },
    }, { new: true });
    return res.status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new apiResponse_1.apiResponse(200, "User logged out successfully.", {}));
}));
exports.logoutUser = logoutUser;
const refreshAccessToken = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const previousRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!previousRefreshToken) {
        return res.status(401).send({ message: "unothorized request" });
    }
    try {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        const decodedToken = jsonwebtoken_1.default.verify(previousRefreshToken, refreshTokenSecret);
        const user = yield user_model_1.User.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id);
        if (!user) {
            return res.status(401).send({ message: "Invalid refresh token" });
        }
        if (previousRefreshToken !== user.refreshToken) {
            return res.status(401).send({ message: "Refresh token was expired or already used" });
        }
        const { accessToken, refreshToken } = yield generateAccessAndRefreshToken(user._id);
        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", refreshToken)
            .json(new apiResponse_1.apiResponse(200, "refresh token generated successfully", {
            accessToken,
            refreshToken
        }));
    }
    catch (error) {
        res.status(401).send({ message: error });
    }
}));
exports.refreshAccessToken = refreshAccessToken;
const currentUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res
        .status(200)
        .json(new apiResponse_1.apiResponse(200, "User fetched successfully", req.body.user));
}));
exports.currentUser = currentUser;
const getUserById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield user_model_1.User.findById(userId).select("-password");
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).json(user);
}));
exports.getUserById = getUserById;
//# sourceMappingURL=user.controller.js.map