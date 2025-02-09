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
exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todo_model_1 = require("../models/todo.model");
const apiResponse_1 = require("../utils/apiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const createTodo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status } = req.body;
    console.log(req.body);
    if (!description) {
        return res.status(400).send({ message: "Todo description is required." });
    }
    const count = yield todo_model_1.Todo.countDocuments({ status });
    const todo = yield todo_model_1.Todo.create({ title, description, status, user: req.body.user._id, order: count });
    if (!todo) {
        return res.status(500).send({ message: "Failed to create todo." });
    }
    return res
        .status(200)
        .json(new apiResponse_1.apiResponse(200, "Todo created successfully.", todo, true));
}));
exports.createTodo = createTodo;
const getTodos = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todo_model_1.Todo.find({ user: req.body.user._id })
        .sort({ order: 1 });
    if (!todos) {
        return res.status(404).send({ message: "No todos found." });
    }
    return res
        .status(200)
        .json(new apiResponse_1.apiResponse(200, "todos found", todos, true));
}));
exports.getTodos = getTodos;
// const updateTodo = asyncHandler(async (req, res) => {
//   const { todoId, status, order } = req.body;
//   if (!todoId) {
//     return res.status(400).send({ message: "Todo ID is required." });
//   }
//   const todo = await Todo.findById(todoId);
//   if (!todo) {
//     return res.status(404).send({ message: "Todo not found." });
//   }
//   if (status) {
//     todo.status = status;
//   }
//   if (order) {
//     todo.order = order;
//   }
//   await todo.save();
//   return res
//     .status(200)
//     .json(new apiResponse(200, "Todo updated successfully.", todo, true));
// });
// src/controllers/todo.controller.ts
const updateTodo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId, status, order, todoIds } = req.body;
    // console.log("datad", todoIds)
    // console.log("hello", todoIds.map((item: string) => new mongoose.Types.ObjectId(item)))
    // const todoIds = JSON.parse(hello)
    if (todoId) {
        const todo = yield todo_model_1.Todo.findById(todoId);
        if (!todo) {
            return res.status(404).send({ message: "Todo not found." });
        }
        if (status) {
            todo.status = status;
        }
        if (order) {
            todo.order = order;
        }
        yield todo.save();
    }
    if (todoIds) {
        const todos = yield todo_model_1.Todo.find({ _id: { $in: todoIds.map((item) => (new mongoose_1.default.Types.ObjectId(item))) } });
        // console.log("todos", todos);
        if (!todos) {
            return res.status(404).send({ message: "Todos not found." });
        }
        const status = todos[0].status;
        // console.log("status", status);
        const allTodos = yield todo_model_1.Todo.find({ status });
        // console.log("allTodos ", allTodos);
        const updatedTodos = allTodos.map((todo, index) => {
            console.log("todo ", Object.assign({}, todo.toObject()));
            if (todoIds.includes(todo._id.toString())) {
                // console.log("object", index);
                return Object.assign(Object.assign({}, todo.toObject()), { order: todoIds.findIndex((id) => todo._id.toString() === id) });
            }
        });
        // console.log("updatedTodos ", updatedTodos);
        yield todo_model_1.Todo.bulkWrite(updatedTodos.map((todo) => ({
            updateOne: {
                filter: { _id: todo._id },
                update: { $set: { order: todo.order } },
            },
        })));
    }
    return res
        .status(200)
        .json(new apiResponse_1.apiResponse(200, "Todo updated successfully.", {}, true));
}));
exports.updateTodo = updateTodo;
//# sourceMappingURL=todo.controller.js.map