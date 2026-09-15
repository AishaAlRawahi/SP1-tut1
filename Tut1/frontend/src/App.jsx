// src/App.jsx
import { useEffect, useState, useCallback } from "react";
import { api } from "./api.js";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import "./index.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  
  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      const params = filter === "all" ? {} : { done: filter === "done" };
      const { data } = await api.get("/todos", { params });
      setTodos(data);
    } catch (e) {
      console.error(e);
      alert("Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { loadTodos(); }, [loadTodos]);

  async function onAdd(title) {
    try {
      const { data } = await api.post("/todos", { title });
      setTodos(prev => [data, ...prev]);
    } catch (e) {
      console.error(e);
      alert("Failed to add todo");
    }
  }

  async function onToggle(id, done) {
    try {
      const { data } = await api.put(`/todos/${id}`, { done });
      setTodos(prev => prev.map(t => (t._id === id ? data : t)));
    } catch (e) {
      console.error(e);
      alert("Failed to toggle todo");
    }
  }

  async function onRename(id, title) {
    try {
      const { data } = await api.put(`/todos/${id}`, { title });
      setTodos(prev => prev.map(t => (t._id === id ? data : t)));
    } catch (e) {
      console.error(e);
      alert("Failed to rename todo");
    }
  }

  async function onRemove(id) {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete todo");
    }
  }

  return (
    <div className="container">
      <h1>TodoList (MERN)</h1>
      <TodoForm onAdd={onAdd} />
      <TodoList
        todos={todos}
        loading={loading}
        onToggle={onToggle}
        onRename={onRename}
        onRemove={onRemove}
      />
    </div>
  );
}
