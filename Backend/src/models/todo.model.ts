import mongoose, { Schema } from "mongoose";

const todoSchema: any = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'completed'],
    default: 'pending'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  order: {
    type: Number,
    default: 0
  }
})

export const Todo = mongoose.model("Todo", todoSchema)