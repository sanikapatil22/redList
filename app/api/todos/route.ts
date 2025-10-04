// import { NextResponse } from "next/server";
// import prisma from "../../../lib/prisma";


// export async function GET() {
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }

// export async function POST(req: Request) {
//   try {
//     const { name } = await req.json();

//     if (!name) {
//       return NextResponse.json({ error: "Name is required" }, { status: 400 });
//     }

//     // Generate a fake email since your schema requires it
//     const email = `${name.replace(/\s+/g, "").toLowerCase()}@example.com`;

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//       },
//     });

//     return NextResponse.json(user);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }




// // // app/api/todos/route.ts
// // import { NextResponse } from "next/server";
// // import prisma from "../../../lib/prisma";


// // export async function POST(req: Request) {
// //   const { text } = await req.json();
// //   const todo = await prisma.todo.create({
// //     data: { text },
// //   });
// //   return NextResponse.json(todo); // important!
// // }






// // import { NextResponse } from "next/server";
// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // // GET all todos
// // export async function GET() {
// //   const todos = await prisma.todo.findMany({
// //     orderBy: { createdAt: "desc" },
// //   });
// //   return NextResponse.json(todos);
// // }

// // // POST new todo
// // export async function POST(req: Request) {
// //   const { text } = await req.json();

// //   if (!text || text.trim() === "") {
// //     return NextResponse.json({ error: "Text is required" }, { status: 400 });
// //   }

// //   const newTodo = await prisma.todo.create({
// //     data: { text },
// //   });

// //   return NextResponse.json(newTodo);
// // }




// import { NextResponse } from "next/server";
// import prisma from "../../../lib/prisma";

// // Get all todos
// export async function GET() {
//   const todos = await prisma.todo.findMany({
//     orderBy: { createdAt: "desc" },
//   });
//   return NextResponse.json(todos);
// }

// // Add new todo
// export async function POST(req: Request) {
//   try {
//     const { title } = await req.json();

//     if (!title) {
//       return NextResponse.json({ error: "Title is required" }, { status: 400 });
//     }

//     const todo = await prisma.todo.create({
//       data: { title },
//     });

//     return NextResponse.json(todo);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// GET: fetch all todos
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

// POST: add a new todo
export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const todo = await prisma.todo.create({
      data: { text },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}

// PATCH: toggle completed status
export async function PATCH(req: Request) {
  try {
    const { id, completed } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
    }

    const updated = await prisma.todo.update({
      where: { id },
      data: { completed },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}
