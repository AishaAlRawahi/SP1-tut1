// src/components/TodoItem.jsx
import { useState } from "react";

export default function TodoItem({ todo, onToggle, onRename, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.title);

  function save() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onRename(todo._id, trimmed);
    setEditing(false);
  }

  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={(e) => onToggle(todo._id, e.target.checked)}
        />
        {!editing ? (
          <span className={todo.done ? "done" : ""}>{todo.title}</span>
        ) : (
          <input
            className="edit-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
          />
        )}
      </label>

      <div className="actions">
        {!editing ? (
          <button onClick={() => setEditing(true)}>Edit</button>
        ) : (
          <button onClick={save}>Save</button>
        )}
        <button className="danger" onClick={() => onRemove(todo._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
