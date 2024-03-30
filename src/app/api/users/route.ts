import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { rows } =
      await sql`SELECT name, username, password, admin FROM users`;
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, username, password } = await request.json();

    if (!name || !username || !password) {
      throw new Error("Name, username and password are required");
    }

    await sql`INSERT INTO users (name, username, password) VALUES (${name}, ${username}, ${password})`;

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
