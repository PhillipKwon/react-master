import { useTodoStore } from "../stores/todoStore";
import TodoCard from "./TodoCard";

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const { getActiveCount, getCompletedCount, clearCompleted } = useTodoStore();

  const activeCount = getActiveCount();
  const completedCount = getCompletedCount();

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">할 일이 없습니다.</p>
        <p className="text-sm">새로운 할 일을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <span>{activeCount}개 남음</span>
          {completedCount > 0 && (
            <span className="ml-2">• {completedCount}개 완료</span>
          )}
        </div>

        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            완료된 항목 삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList;
