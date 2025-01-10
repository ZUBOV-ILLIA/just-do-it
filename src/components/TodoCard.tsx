import { useState } from "react";
import { deleteTodo, updateTodo } from "../api/todos";

export default function TodoCard({
  todo,
  todos,
  setTodos,
}: {
  todo: TodoCardType;
  todos: TodoCardType[];
  setTodos: (val: TodoCardType[]) => void;
}) {
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(!!todo.completed);
  const [isRemoved, setIsRemoved] = useState(false);

  async function updateTitle() {
    try {
      await updateTodo({ id: todo.id, title, completed: +completed });
    } catch (error) {
      console.error(error);
    }
  }

  async function updateCompleted() {
    try {
      await updateTodo({ id: todo.id, title, completed: +!completed });
      setCompleted(!completed);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeTodo() {
    try {
      await deleteTodo(todo.id);

      setIsRemoved(true);

      setTimeout(() => {
        setTodos(todos.filter((item) => item.id !== todo.id));
      }, 500);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`p-2 w-full flex gap-4 border rounded-lg shadow-md animate__animated ${
        isRemoved ? "animate__backOutLeft" : "animate__backInRight"
      }`}
    >
      <button
        className="py-2 px-4 bg-red-500 text-white rounded-lg"
        onClick={removeTodo}
      >
        X
      </button>
      <input
        type="text"
        className={`w-full px-2 bg-transparent outline-none ${
          completed ? "line-through text-gray-200" : ""
        }`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={updateTitle}
        disabled={completed}
      />
      <input type="checkbox" checked={completed} onChange={updateCompleted} />
    </div>
  );
}
