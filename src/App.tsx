import { nanoid } from "nanoid";
import { ChangeEvent, MouseEvent } from "react";
import { useSessionStorage } from "usehooks-ts";

import { Form } from "./components/Form";
import { Todo } from "./components/TodoItem";
import { initialData } from "./initialData";

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useSessionStorage<Todo[]>("todos", initialData);

  const addTodo = (name: string): void => {
    const newTodo: Todo = {
      id: nanoid(),
      name,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleTodoToggle = (event: ChangeEvent<HTMLInputElement>): void => {
    const id = event.currentTarget.id;

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

  const deleteTodo = (event: MouseEvent<HTMLButtonElement>): void => {
    const remainingTodos = todos.filter((todo) => String(event.currentTarget.id) !== todo.id);
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

  return (
    <div className="flex justify-center h-screen">
      <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3">
        <Form addTodo={addTodo} />
        <h2 className="mr-6 text-4xl font-bold text-purple-600">{todos.length} tasks</h2>
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              handleTodoToggle={handleTodoToggle}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
