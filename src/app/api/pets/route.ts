import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { rows } =
      await sql`SELECT species, type, size_hi, size_lo, price FROM pets`;
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { species, type, price, size_hi, size_lo } = await request.json();

    if (!species || !type || !price || !size_hi || !size_lo) {
      throw new Error("Species, type, size, and price are required");
    }

    await sql`INSERT INTO pets (species, type, price, size_hi, size_lo) VALUES (${species}, ${type}, ${price}, ${size_hi}, ${size_lo})`;

    return NextResponse.json(
      { message: "Pet added successfully" },
      { status: 201 }
    );
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
