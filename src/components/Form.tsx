import { FormEvent, ChangeEvent, useState } from "react";

interface FormProps {
  addTodo: (name: string) => void;
}

export function Form({ addTodo }: FormProps) {
  const [name, setName] = useState("");

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    setName("");
    addTodo(name);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>
        <label
          className="mb-2 flex items-center justify-center mr-6 text-4xl font-bold text-purple-600"
          htmlFor="new-todo-input"
        >
          Todos
        </label>
      </h2>
      <input
        className="mb-2 w-full px-2 py-3 border rounded outline-none border-grey-600"
        id="new-todo-input"
        value={name}
        onChange={onChange}
      />
      <input
        className={`mb-5 disabled:bg-gray-300 disabled:opacity-50 bg-blue-200 w-full px-2 py-3 border rounded outline-none border-grey-600 ${
          !name ? "cursor-not-allowed" : "cursor-pointer"
        }
        `}
        type="submit"
        value="Submit"
        disabled={!name}
      />
    </form>
  );
}
