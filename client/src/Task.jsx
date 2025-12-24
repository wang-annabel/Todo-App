import { useState } from "react";

function Task({ task, onUpdate, onDelete }) {
  const [completed, setCompleted] = useState(task.completed);
  console.log(task);

  return (
    <>
      <div className="card todo-item">
        <p>{task.task}</p>
        <div className="todo-buttons">
          <button onClick={() => onUpdate(task.id)} disabled={completed}>
            <h6>Done</h6>
          </button>
          <button onClick={() => onDelete(task.id)}>
            <h6>Delete</h6>
          </button>
        </div>
      </div>
    </>
  );
}

export default Task;
