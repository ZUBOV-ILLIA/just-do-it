import { useEffect, useState } from "react";
import { addTodo, getTodos } from "../api/todos";
import TodoCard from "./TodoCard";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoCardType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const todos = await getTodos();

        setTodos(todos);
      } catch (error) {
        console.error(error);
      }
    };

    getAllTodos();
  }, [setTodos]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!title.trim()) return;

      const newTodo = await addTodo(title);

      console.log("new", newTodo);

      setTodos([...todos, newTodo]);
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col grow justify-between">
      <ul className="flex flex-col gap-3">
        {todos.length > 0 &&
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
            />
          ))}
      </ul>

      <form
        onSubmit={submit}
        className="flex gap-4 bg-gray-700 text-white rounded-md overflow-hidden"
      >
        <input
          type="text"
          className="py-3 px-5 w-full bg-transparent outline-none"
          placeholder="Add new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="py-3 px-4 bg-gray-600">
          Add
        </button>
      </form>
    </div>
  );
}
