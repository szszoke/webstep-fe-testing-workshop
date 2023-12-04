import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Form } from "./Form";

describe("submit button clicked", () => {
  it("should call addTodo callback when name is typed in", async () => {
    const handleAddTodo = vitest.fn();

    const user = userEvent.setup();

    render(<Form addTodo={handleAddTodo} />);

    const nameInput = screen.getByTestId("new-todo-name-input");
    const submitButton = screen.getByTestId("submit-new-todo-button");

    expect(nameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await user.type(nameInput, "new todo");

    expect(nameInput).toHaveValue("new todo");

    await user.click(submitButton);

    // input is cleared after submit
    expect(nameInput).toHaveValue("");

    expect(handleAddTodo).toHaveBeenCalledOnce();
    expect(handleAddTodo).toHaveBeenCalledWith("new todo");
  });

  it("should not call addTodo callback when name left empty", async () => {
    const handleAddTodo = vitest.fn();

    const user = userEvent.setup();

    render(<Form addTodo={handleAddTodo} />);

    const nameInput = screen.getByTestId("new-todo-name-input");
    const submitButton = screen.getByTestId("submit-new-todo-button");

    expect(nameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await user.click(submitButton);

    expect(handleAddTodo).not.toHaveBeenCalled();
  });
});
