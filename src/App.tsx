import { Form } from "./components/Form";
import { Todo } from "./components/TodoItem";
import { useTodoStore } from "./todoStore";

function App() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodoStore();

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
              handleTodoToggle={() => toggleTodo(todo.id)}
              deleteTodo={() => deleteTodo(todo.id)}
              editTodo={editTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
