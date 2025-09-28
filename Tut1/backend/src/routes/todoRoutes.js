// src/routes/todoRoutes.js
import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../controllers/todoController.js";

const router = Router();

// POST /api/todos  -> Add a new todo
router.post("/", createTodo);

// GET /api/todos   -> Retrieve all todos
router.get("/", getTodos);

// PUT /api/todos/:id -> Update (toggle/edit)
router.put("/:id", updateTodo);

// DELETE /api/todos/:id -> Delete
router.delete("/:id", deleteTodo);

export default router;
