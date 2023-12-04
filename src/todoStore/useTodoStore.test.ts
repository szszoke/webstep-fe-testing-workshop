import { act, renderHook } from "@testing-library/react";

import { initialData } from "../initialData";

import { useTodoStore } from ".";

afterEach(() => sessionStorage.clear());

it("should return initial todos", () => {
  const { result } = renderHook(() => useTodoStore());

  expect(result.current.todos).toEqual(initialData);
});

it("should return newly added todo", () => {
  const { result } = renderHook(() => useTodoStore());

  act(() => result.current.addTodo("test todo"));

  expect(result.current.todos).toEqual([
    ...initialData,
    {
      id: expect.any(String),
      name: "test todo",
      completed: false,
    },
  ]);
});

it("should return newly added todo", () => {
  const { result } = renderHook(() => useTodoStore());

  act(() => result.current.addTodo("test todo"));

  expect(result.current.todos).toEqual([
    ...initialData,
    {
      id: expect.any(String),
      name: "test todo",
      completed: false,
    },
  ]);
});

it("should toggle completed flag", () => {
  const { result } = renderHook(() => useTodoStore());

  const completedBefore = result.current.todos[0].completed;

  act(() => result.current.toggleTodo(result.current.todos[0].id));

  expect(result.current.todos[0].completed).toBe(!completedBefore);
});

it("should delete todo", () => {
  const { result } = renderHook(() => useTodoStore());

  act(() => result.current.deleteTodo(result.current.todos[0].id));

  expect(result.current.todos).toEqual(initialData.slice(1));
});

it("should update todo", () => {
  const { result } = renderHook(() => useTodoStore());

  expect(result.current.todos).toEqual(initialData);

  act(() => result.current.editTodo(result.current.todos[0].id, "new name"));

  expect(result.current.todos[0].name).toBe("new name");
});
