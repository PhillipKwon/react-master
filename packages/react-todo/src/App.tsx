import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            React Todo
          </h1>

          <CreateTodo />
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default App;
