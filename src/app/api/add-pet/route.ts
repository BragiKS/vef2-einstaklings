import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const species = searchParams.get('species');
  const type = searchParams.get('type');
  const price = searchParams.get('price');
  const size_hi = searchParams.get('size_hi');
  const size_lo = searchParams.get('size_lo');
  try {
    if (!species || !type || !price || !size_hi || !size_lo)
      throw new Error('Species, type, size and price required');
    await sql`INSERT INTO Pets (species, type, price, size_hi, size_lo) VALUES (${species}, ${type}, ${price}, ${size_hi}, ${size_lo})`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const pets = await sql`SELECT * FROM Pets`;
  return NextResponse.json({ pets }, { status: 200 });
}
