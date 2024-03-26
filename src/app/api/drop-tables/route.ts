import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await sql`DROP TABLE IF EXISTS Users;`;
    await sql`DROP TABLE IF EXISTS Pets;`;
    await sql`DROP TABLE IF EXISTS Bucket;`;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
