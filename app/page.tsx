"use client";

import { useState, useEffect } from "react";
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    if (!user) return;
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, [user]);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    setInput("");
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-[#400F09] flex flex-col items-center justify-center p-8 text-white">
      <h1 className="text-4xl mb-6">My Todo List</h1>

      <SignedOut>
        <SignInButton>
          <button className="bg-white text-[#400F09] px-4 py-2 rounded">Sign In</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task"
            className="px-4 py-2 rounded w-64 text-black focus:outline-none border"
          />
          <button
            type="submit"
            className="bg-white text-[#400F09] px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p>No todos yet. Add your first task!</p>
        ) : (
          <ul className="w-64">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center mb-2 bg-white text-[#400F09] px-4 py-2 rounded"
              >
                <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
              </li>
            ))}
          </ul>
        )}
      </SignedIn>
    </div>
  );
}
