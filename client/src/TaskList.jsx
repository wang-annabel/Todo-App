import Task from "./Task";

function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <>
      <div className="list">
        <ul>
          {tasks.map((task) => (
            <Task
              task={task}
              key={task.id}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default TaskList;
