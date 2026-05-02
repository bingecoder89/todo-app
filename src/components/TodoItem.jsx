import "../index.css";
export default function TodoItem({ todo }) {
  return (
    <span
      className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}
    >
      {todo.task}
    </span>
  );
}
