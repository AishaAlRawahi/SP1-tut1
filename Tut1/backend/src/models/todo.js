// src/models/Todo.js
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false }
  },
  { timestamps: true } // createdAt, updatedAt auto-managed
);

export default mongoose.model("Todo", TodoSchema);
