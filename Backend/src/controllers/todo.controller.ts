import mongoose from "mongoose";
import { Todo } from "../models/todo.model";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (!description) {
    return res.status(400).send({ message: "Todo description is required." })
  }
  const count = await Todo.countDocuments({ status });

  const todo = await Todo.create(
    { title, description, status, user: req.body.user._id, order: count });

  if (!todo) {
    return res.status(500).send({ message: "Failed to create todo." })
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Todo created successfully.", todo, true))
})

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.body.user._id })
    .sort({ order: 1 });
  if (!todos) {
    return res.status(404).send({ message: "No todos found." })
  }
  return res
    .status(200)
    .json(new apiResponse(200, "todos found", todos, true))
})

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
const updateTodo = asyncHandler(async (req, res) => {
  const { todoId, status, order, todoIds } = req.body;
  // console.log("datad", todoIds)
  // console.log("hello", todoIds.map((item: string) => new mongoose.Types.ObjectId(item)))
  // const todoIds = JSON.parse(hello)
  if (todoId) {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).send({ message: "Todo not found." });
    }

    if (status) {
      todo.status = status;
    }

    if (order) {
      todo.order = order;
    }

    await todo.save();
  }

  if (todoIds) {
    const todos = await Todo.find({ _id: { $in: todoIds.map((item: string) => (new mongoose.Types.ObjectId(item))) } });
    // console.log("todos", todos);

    if (!todos) {
      return res.status(404).send({ message: "Todos not found." });
    }

    const status = todos[0].status;
    // console.log("status", status);

    const allTodos = await Todo.find({ status });
    // console.log("allTodos ", allTodos);

    const updatedTodos = allTodos.map((todo, index) => {
      console.log("todo ", {...todo.toObject()});
      if (todoIds.includes(todo._id.toString())) {
        // console.log("object", index);
        return { ...todo.toObject(), order: todoIds.findIndex((id: string) =>  todo._id.toString() === id) };
      } 
    });
    // console.log("updatedTodos ", updatedTodos);

    await Todo.bulkWrite(updatedTodos.map((todo) => ({
      updateOne: {
        filter: { _id: todo._id },
        update: { $set: { order: todo.order } },
      },
    })));
  }

  return res
    .status(200)
    .json(new apiResponse(200, "Todo updated successfully.", {}, true));
});

export { createTodo, getTodos, updateTodo }