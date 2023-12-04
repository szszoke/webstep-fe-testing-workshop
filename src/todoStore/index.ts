import { nanoid } from "nanoid";
import { useSessionStorage } from "usehooks-ts";

import { initialData } from "../initialData";

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

export const useTodoStore = () => {
  const [todos, setTodos] = useSessionStorage<Todo[]>("todos", initialData);

  const addTodo = (name: string): void => {
    const newTodo: Todo = {
      id: nanoid(),
      name,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string): void => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newTodo: Todo = {
          ...todo,
          completed: !todo.completed,
        };
        return newTodo;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: string): void => {
    const remainingTodos = todos.filter((todo) => id !== todo.id);
    setTodos(remainingTodos);
  };

  const editTodo = (id: string, newName: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newTodo: Todo = {
          ...todo,
          name: newName,
        };
        return newTodo;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };
};
