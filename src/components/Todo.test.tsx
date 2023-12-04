import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Todo } from "./TodoItem";

it("should show todo name in name input", async () => {
  const handleDoneToggle = vitest.fn();
  const handleDelete = vitest.fn();
  const handleEdit = vitest.fn();

  const initialName = "initial value";

  render(
    <Todo
      todo={{
        id: "test",
        name: initialName,
        completed: false,
      }}
      handleTodoToggle={handleDoneToggle}
      deleteTodo={handleDelete}
      editTodo={handleEdit}
    />
  );

  const nameInput = screen.getByTestId("todo-name-input");

  expect(nameInput).toBeInTheDocument();
  expect(nameInput).toHaveValue(initialName);
});

it("should show done checkbox checked if 'completed' is true", async () => {
  const handleDoneToggle = vitest.fn();
  const handleDelete = vitest.fn();
  const handleEdit = vitest.fn();

  const initialName = "initial value";

  render(
    <Todo
      todo={{
        id: "test",
        name: initialName,
        completed: true,
      }}
      handleTodoToggle={handleDoneToggle}
      deleteTodo={handleDelete}
      editTodo={handleEdit}
    />
  );

  const doneCheckbox = screen.getByTestId("todo-done-checkbox");

  expect(doneCheckbox).toBeInTheDocument();
  expect(doneCheckbox).toBeChecked();
});

it("should show done checkbox unchecked if 'completed' is false", async () => {
  const handleDoneToggle = vitest.fn();
  const handleDelete = vitest.fn();
  const handleEdit = vitest.fn();

  const initialName = "initial value";

  render(
    <Todo
      todo={{
        id: "test",
        name: initialName,
        completed: false,
      }}
      handleTodoToggle={handleDoneToggle}
      deleteTodo={handleDelete}
      editTodo={handleEdit}
    />
  );

  const doneCheckbox = screen.getByTestId("todo-done-checkbox");

  expect(doneCheckbox).toBeInTheDocument();
  expect(doneCheckbox).not.toBeChecked();
});

it("should call deleteTodo callback when delete button clicked", async () => {
  const handleDoneToggle = vitest.fn();
  const handleDelete = vitest.fn();
  const handleEdit = vitest.fn();

  const user = userEvent.setup();

  render(
    <Todo
      todo={{
        id: "test",
        name: "",
        completed: false,
      }}
      handleTodoToggle={handleDoneToggle}
      deleteTodo={handleDelete}
      editTodo={handleEdit}
    />
  );

  const doneToggleCheckbox = screen.getByTestId("todo-done-checkbox");

  expect(doneToggleCheckbox).toBeInTheDocument();

  await user.click(doneToggleCheckbox);

  expect(handleDoneToggle).toHaveBeenCalledOnce();

  expect(handleDelete).not.toHaveBeenCalled();
  expect(handleEdit).not.toHaveBeenCalled();
});

it("should call deleteTodo callback when delete button clicked", async () => {
  const handleDoneToggle = vitest.fn();
  const handleDelete = vitest.fn();
  const handleEdit = vitest.fn();

  const user = userEvent.setup();

  render(
    <Todo
      todo={{
        id: "test",
        name: "",
        completed: false,
      }}
      handleTodoToggle={handleDoneToggle}
      deleteTodo={handleDelete}
      editTodo={handleEdit}
    />
  );

  const deleteButton = screen.getByTestId("todo-delete-button");

  expect(deleteButton).toBeInTheDocument();

  await user.click(deleteButton);

  expect(handleDelete).toHaveBeenCalledOnce();

  expect(handleEdit).not.toHaveBeenCalled();
  expect(handleDoneToggle).not.toHaveBeenCalled();
});

it("should call editTodo callback when typing into name input", async () => {
  const handleDoneToggle = vitest.fn();
  const handleDelete = vitest.fn();
  const handleEdit = vitest.fn();

  const user = userEvent.setup();

  const initialName = "initial value";
  const newName = " changed";
  const finalName = initialName + newName;

  render(
    <Todo
      todo={{
        id: "test",
        name: initialName,
        completed: false,
      }}
      handleTodoToggle={handleDoneToggle}
      deleteTodo={handleDelete}
      editTodo={handleEdit}
    />
  );

  const nameInput = screen.getByTestId("todo-name-input");

  expect(nameInput).toBeInTheDocument();

  await user.type(nameInput, newName);

  expect(nameInput).toHaveValue(finalName);
  expect(handleEdit).toHaveBeenLastCalledWith("test", finalName);

  expect(handleDelete).not.toHaveBeenCalled();
  expect(handleDoneToggle).not.toHaveBeenCalled();
});
