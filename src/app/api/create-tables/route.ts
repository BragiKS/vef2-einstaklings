import path from 'path';
import { readFile } from 'fs/promises';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const createSqlQuery = await readFile('./sql/schema.sql', 'utf-8');
    const sqlCommands = createSqlQuery.split(';').filter(Boolean);
    for (const sqlCommand of sqlCommands) {
      console.log(`${sqlCommand}`);
      await sql`${sqlCommand}`;
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
