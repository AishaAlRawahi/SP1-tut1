// src/components/TodoList.jsx
import TodoItem from "./TodoItem";

export default function TodoList({ todos, loading, onToggle, onRename, onRemove }) {
  if (loading) return <p>Loading…</p>;
  if (!todos.length) return <p>No todos yet. Add one!</p>;

  return (

    <div>
      <div className="filter-tabs">
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>All</button>
        <button onClick={() => setFilter("active")} disabled={filter === "active"}>Active</button>
        <button onClick={() => setFilter("done")} disabled={filter === "done"}>Done</button>
      </div>
    
    <ul className="todo-list">
      {todos.map((t) => (
        <TodoItem
          key={t._id}
          todo={t}
          onToggle={onToggle}
          onRename={onRename}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
