import { Trash2, Check } from "lucide-react";
import type { Todo } from "../types/Todo";
import { useTodoStore } from "../stores/todoStore";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const { toggleTodo, deleteTodo } = useTodoStore();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={handleToggle}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-green-500"
        }`}
      >
        {todo.completed && <Check size={14} />}
      </button>

      <span
        className={`flex-1 text-gray-800 ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.title}
      </span>

      <button
        onClick={handleDelete}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TodoCard;
