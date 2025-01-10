import "animate.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="flex flex-col container mx-auto p-4 min-h-svh bg-gray-400 overflow-hidden">
      <h1 className="mb-8 text-3xl text-center font-bold italic underline animate__animated animate__zoomInLeft">
        Just do it
      </h1>

      <TodoList />
    </div>
  );
}

export default App;
