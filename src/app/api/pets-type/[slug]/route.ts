import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

type Params = {
  slug: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const result = await sql`SELECT * FROM pets WHERE type=${params.slug}`;

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Pets not found" }, { status: 404 });
    }
    console.log(result);
    const response = NextResponse.json(result.rows, { status: 200 });
    return response;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
