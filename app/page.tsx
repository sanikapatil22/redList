"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from API
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    setInput("");
    fetchTodos(); // refresh list
  };

  // Toggle todo completion
  const toggleTodo = async (id: number, completed: boolean) => {
    await fetch("/api/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed }),
    });
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-[#400F09] flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-white">My Checklist</h1>

      <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
        <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Add a task"
  className="px-4 py-2 rounded w-64 focus:outline-none border-2 border-white"
/>

        <button
          type="submit"
          className="bg-white text-[#400F09] px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2 w-64">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              className="w-4 h-4"
            />
            <span className={todo.completed ? "line-through opacity-70" : ""}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

