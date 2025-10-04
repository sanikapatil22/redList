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
