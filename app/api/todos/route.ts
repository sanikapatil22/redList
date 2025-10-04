// // import { NextResponse } from "next/server";
// // import prisma from "../../../lib/prisma";

// // // GET: fetch all todos
// // export async function GET() {
// //   try {
// //     const todos = await prisma.todo.findMany({
// //       orderBy: { createdAt: "desc" },
// //     });
// //     return NextResponse.json(todos);
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
// //   }
// // }

// // // POST: add a new todo
// // export async function POST(req: Request) {
// //   try {
// //     const { text } = await req.json();

// //     if (!text || text.trim() === "") {
// //       return NextResponse.json({ error: "Text is required" }, { status: 400 });
// //     }

// //     const todo = await prisma.todo.create({
// //       data: { text },
// //     });

// //     return NextResponse.json(todo);
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
// //   }
// // }

// // // PATCH: toggle completed status
// // export async function PATCH(req: Request) {
// //   try {
// //     const { id, completed } = await req.json();

// //     if (!id) {
// //       return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
// //     }

// //     const updated = await prisma.todo.update({
// //       where: { id },
// //       data: { completed },
// //     });

// //     return NextResponse.json(updated);
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// import prisma from "../../../lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// // GET /api/todos → fetch todos for logged-in user
// export async function GET() {
//   const user = await currentUser();
//   if (!user) return NextResponse.json([], { status: 401 });

//   const todos = await prisma.todo.findMany({
//     where: { userId: user.id },
//     orderBy: { createdAt: "desc" },
//   });

//   return NextResponse.json(todos);
// }

// // POST /api/todos → create a new todo
// export async function POST(req: Request) {
//   const user = await currentUser();
//   if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { text } = await req.json();
//   if (!text) return NextResponse.json({ error: "Text required" }, { status: 400 });

//   const todo = await prisma.todo.create({
//     data: { text, userId: user.id },
//   });

//   return NextResponse.json(todo);
// }

// // PATCH /api/todos/:id → toggle completed
// export async function PATCH(req: Request, { params }: { params: { id: string } }) {
//   const user = await currentUser();
//   if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const todoId = parseInt(params.id, 10);
//   const todo = await prisma.todo.findUnique({ where: { id: todoId } });

//   if (!todo || todo.userId !== user.id)
//     return NextResponse.json({ error: "Not found" }, { status: 404 });

//   const updated = await prisma.todo.update({
//     where: { id: todoId },
//     data: { completed: !todo.completed },
//   });

//   return NextResponse.json(updated);
// }






import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// GET all todos for current user
export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json([], { status: 401 });

  // Upsert user into Prisma
  await prisma.user.upsert({
    where: { id: user.id },
    update: {
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    create: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(todos);
}

// POST a new todo for current user
export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { text } = await req.json();
  if (!text) return NextResponse.json({ error: "Text required" }, { status: 400 });

  const todo = await prisma.todo.create({
    data: { text, userId: user.id },
  });

  return NextResponse.json(todo);
}
