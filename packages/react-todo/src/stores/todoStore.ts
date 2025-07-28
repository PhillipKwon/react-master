import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo } from "../types/Todo";

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  getCompletedCount: () => number;
  getActiveCount: () => number;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (title: string) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          title: title.trim(),
          completed: false,
          createdAt: new Date(),
        };
        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },

      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      getCompletedCount: () => {
        return get().todos.filter((todo) => todo.completed).length;
      },

      getActiveCount: () => {
        return get().todos.filter((todo) => !todo.completed).length;
      },
    }),
    {
      name: "react-todo-storage",
    }
  )
);
