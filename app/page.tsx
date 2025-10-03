// import prisma from "../lib/prisma";


// export default async function Home() {
//   const users = await prisma.user.findMany();
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
//       <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
//         Superblog
//       </h1>
//       <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
//         {users.map((user) => (
//           <li key={user.id} className="mb-2 text-black">
//             {user.name}
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string | null;
  email: string;
}

export default function Home() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    fetchUsers(); // refresh list
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 text-[#333333]">Superblog</h1>

      <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <ol className="list-decimal list-inside">
        {users.map((user) => (
          <li key={user.id} className="mb-2 text-black">
            {user.name || "No Name"}
          </li>
        ))}
      </ol>
    </div>
  );
}
