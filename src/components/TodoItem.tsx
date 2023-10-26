import { ChangeEvent, MouseEvent, useState, useRef } from "react";

import type { Todo } from "../App";

interface Test {
  todo: Todo;
  handleTodoToggle: (event: ChangeEvent<HTMLInputElement>) => void;
  deleteTodo: (event: MouseEvent<HTMLButtonElement>) => void;
  editTodo: (id: string, newName: string) => void;
}

export function Todo({ todo, handleTodoToggle, deleteTodo, editTodo }: Test) {
  const [name, setName] = useState("");

  const editFieldRef = useRef(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.currentTarget.value);
    editTodo(todo.id, e.currentTarget.value);
  };

  return (
    <li className="relative flex items-center justify-between px-2 py-6 border-b">
      <input
        ref={editFieldRef}
        onChange={onInputChange}
        className={`inline-block mt-1 px-2 py-3 border rounded text-gray-600 w-6/12 ${
          todo.completed ? "line-through" : ""
        }`}
        value={name || todo.name}
      />

      <div className="absolute right-0 flex items-center">
        <input
          className="w-5 h-5"
          type="checkbox"
          id={todo.id}
          defaultChecked={todo.completed}
          onChange={handleTodoToggle}
        />
        <button className="w-5 h-5" id={todo.id} onClick={deleteTodo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-red-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </li>
  );
}
