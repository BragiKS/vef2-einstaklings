import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await sql`DROP TABLE IF EXISTS users`;
    await sql`DROP TABLE IF EXISTS pets`;
    await sql`DROP TABLE IF EXISTS bucket`;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
