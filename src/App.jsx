import { useEffect, useState } from "react";
import "./index.css";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setLoading("Loading...");
    setTimeout(() => {
      setTodos(todos);
      setLoading(null);
    }, 1000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const isTaskPresent = todos.some(
    (todo) => todo.task.toLowerCase() === text.toLowerCase(),
  );
  const handleAddTask = () => {
    if (!text.trim()) return;

    if (isTaskPresent) {
      setError("Todo already exists!");
      setText("");
      return;
    }

    setIsDisabled(true);
    setLoading("Adding...");

    setTimeout(() => {
      const todo = {
        id: Date.now().toString(),
        task: text,
        completed: false,
      };
      setTodos([...todos, todo]);

      setIsDisabled(false);
      setLoading("");
    }, 1000);
    setText("");
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setDeleteText("Deleting...");
    setIsDisabled(true);
    setTimeout(() => {
      setTodos(updatedTodos);
      setDeleteText("");
      setIsDisabled(false);
    }, 1000);
  };

  const selectedCount = todos.filter((todo) => todo.completed);

  const handleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleSelectAll = () => {
    const isAllSelected = todos.every((todo) => todo.completed);
    const updatedTodos = todos.map((todo) => {
      return {
        ...todo,
        completed: !isAllSelected,
      };
    });
    setTodos(updatedTodos);
  };

  const handleChange = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleEdit = (index) => {
    setEditId(index);
    setEditValue(todos[index].task);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleKeyDownAll = (e) => {
    if (e.key === "Enter") {
      const updatedTodos = todos.map((todo, index) => {
        if (editId === index) {
          return {
            ...todo,
            task: editValue,
          };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditId(null);
    }

    if (e.key === "Escape") {
      setEditId(null);
      e.target.blur();
    }
  };

  const searchedTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(debouncedSearch),
  );

  const completedTodos = searchedTodos.filter((todo) => {
    if (isChecked) {
      return todo.completed;
    }
    return true;
  });
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
          Todo App
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your task"
            value={text}
            onKeyDown={handleChange}
            onChange={(e) => {
              setText(e.target.value);
              setError("");
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            disabled={isDisabled}
            onClick={handleAddTask}
            className="w-full mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            Add
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search todo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          {loading && <p className="text-green-500">{loading}</p>}
        </div>
        <div className="mb-4">{!todos.length && <p>No todos found</p>}</div>
        <div className="mb-4">
          {searchedTodos.length > 0 && (
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={todos.every((todo) => todo.completed)}
                onChange={handleSelectAll}
                className="mr-2"
              />
              Select All
            </label>
          )}
        </div>
        <ul className="space-y-2">
          {completedTodos.length > 0 &&
            completedTodos.map((todo, index) => {
              return (
                <li
                  key={todo.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 border border-gray-200 rounded-md space-y-2 sm:space-y-0"
                >
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleComplete(todo.id)}
                      className="mr-2"
                    />
                    {editId === index ? (
                      <input
                        type="text"
                        value={editValue}
                        onKeyDown={handleKeyDownAll}
                        onChange={handleEditChange}
                        autoFocus
                        className="flex-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <TodoItem todo={todo} />
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                    <button
                      disabled={todo.completed}
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md hover:bg-yellow-600 disabled:bg-gray-400 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      disabled={isDisabled}
                      onClick={() => handleDelete(todo.id)}
                      className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md hover:bg-red-600 disabled:bg-gray-400 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                  {deleteId === todo.id && (
                    <span className="text-red-500 text-sm sm:ml-2">
                      {deleteText}
                    </span>
                  )}
                </li>
              );
            })}
        </ul>
        {error && <p className="text-red-500 mt-4">"Todo already exists!"</p>}
        <p className="mt-4 text-center">
          {completedTodos.some((todo) => todo.completed) &&
            `${selectedCount.length} todos selected`}
        </p>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              value={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mr-2"
            />
            Show completed todos
          </label>
        </div>
      </div>
    </div>
  );
}
