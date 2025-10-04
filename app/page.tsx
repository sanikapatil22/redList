// // "use client";

// // import { useState, useEffect } from "react";

// // interface User {
// //   id: number;
// //   name: string | null;
// //   email: string;
// // }

// // export default function Home() {
// //   const [name, setName] = useState("");
// //   const [users, setUsers] = useState<User[]>([]);

// //   const fetchUsers = async () => {
// //     const res = await fetch("/api/users");
// //     const data = await res.json();
// //     setUsers(data);
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!name) return;

// //     await fetch("/api/users", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ name }),
// //     });

// //     setName("");
// //     fetchUsers(); // refresh list
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
// //       <h1 className="text-4xl font-bold mb-8 text-[#333333]">Superblog</h1>

// //       <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
// //         <input
// //           type="text"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //           placeholder="Enter your name"
// //           className="border px-3 py-2 rounded"
// //         />
// //         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
// //           Add
// //         </button>
// //       </form>

// //       <ol className="list-decimal list-inside">
// //         {users.map((user) => (
// //           <li key={user.id} className="mb-2 text-black">
// //             {user.name || "No Name"}
// //           </li>
// //         ))}
// //       </ol>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";

// interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }

// export default function Home() {
//   const [title, setTitle] = useState("");
//   const [todos, setTodos] = useState<Todo[]>([]);

//   // Fetch todos
//   const fetchTodos = async () => {
//     const res = await fetch("/api/todos");
//     const data = await res.json();
//     setTodos(data);
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   // Add todo
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title) return;

//     await fetch("/api/todos", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title }),
//     });

//     setTitle("");
//     fetchTodos(); // refresh list
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
//       <h1 className="text-4xl font-bold mb-8 text-[#333333]">Todo List</h1>

//       <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter a todo"
//           className="border px-3 py-2 rounded"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add
//         </button>
//       </form>

//       <ul className="list-disc list-inside text-black">
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             {todo.title} {todo.completed ? "✅" : "❌"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }









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

