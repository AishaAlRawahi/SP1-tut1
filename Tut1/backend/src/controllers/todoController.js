// src/controller/todoController.js
import mongoose from "mongoose";
import Todo from "../models/todo.js";

export async function createTodo(req, res, next) {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "title is required" });
    }
    const todo = await Todo.create({ title: title.trim() });
    res.status(201).json(todo);
  } catch (err) { next(err); }
}

export async function getTodos(req, res, next) {
  try {
    const {done} = req.query;
    const filter = {};
    if (done == 'true'){
      filter.done = true;
    }
    else{
      filter.done = false;
    }
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) { next(err); }
}

export async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "invalid id" });
    }
    const { title, done } = req.body;

    const update = {};
    if (typeof title === "string") update.title = title.trim();
    if (typeof done === "boolean") update.done = done;

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: "nothing to update" });
    }

    const updated = await Todo.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ error: "todo not found" });
    res.json(updated);
  } catch (err) { next(err); }
}

export async function deleteTodo(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "invalid id" });
    }
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "todo not found" });
    res.json({ ok: true });
  } catch (err) { next(err); }
}
