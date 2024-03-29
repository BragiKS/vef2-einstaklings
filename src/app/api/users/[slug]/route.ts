import { sql } from "@vercel/postgres";
import { stat } from "fs";
import { NextResponse } from "next/server";

type Params = {
  slug: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const result =
      await sql`SELECT name, username, password, admin WHERE username=${params.slug}`;

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
