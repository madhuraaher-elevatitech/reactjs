function TodoItem({ task, deleteTask, toggleTask }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      <span className={task.completed ? "completed" : ""}>
        {task.text}
      </span>

      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
      >
        ✕
      </button>
    </li>
  );
}

export default TodoItem;
