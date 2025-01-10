import { useEffect, useState } from "react";
import { addTodo, getTodos } from "../api/todos";
import TodoCard from "./TodoCard";
import Loader from "./Loader";

export default function TodoList() {
  const [pending, setPending] = useState(false);
  const [addingTodoPending, setAddingTodoPending] = useState(false);
  const [waitForApi, setWaitForApi] = useState(false);
  const [todos, setTodos] = useState<TodoCardType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        setPending(true);
        const todos = await getTodos();

        if (!todos) {
          setWaitForApi(true);

          return;
        }

        setTodos(todos);
      } catch (error) {
        console.error(error);
      } finally {
        setPending(false);
      }
    };

    getAllTodos();
  }, [setTodos]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!title.trim()) return;

      setAddingTodoPending(true);

      const newTodo = await addTodo(title);

      setTodos([...todos, newTodo]);
      setTitle("");
    } catch (error) {
      console.error(error);
    } finally {
      setAddingTodoPending(false);
    }
  }

  return (
    <div className="flex flex-col grow justify-between">
      {waitForApi && (
        <div className="mt-10 flex flex-col gap-4 text-red-100">
          <h2 className="text-3xl font-bold text-center">
            Oops, looks like we need wait until API will start
          </h2>
          <p className="text-xl text-center">
            Usually it takes a few minutes, so please wait a bit, and try to
            reload page.
          </p>
        </div>
      )}

      {!pending && (
        <ul className="flex flex-col gap-3">
          {todos &&
            todos.length > 0 &&
            todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
        </ul>
      )}

      {addingTodoPending && <Loader />}

      <form
        onSubmit={submit}
        className="mt-4 flex gap-4 bg-gray-700 text-white rounded-md overflow-hidden"
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
