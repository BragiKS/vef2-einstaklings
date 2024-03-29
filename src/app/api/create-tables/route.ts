import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE IF NOT EXISTS pets (
        species VARCHAR(255) PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        size_hi INT NOT NULL,
        size_lo INT NOT NULL,
        price INT NOT NULL
    )`;
    await sql`CREATE TABLE IF NOT EXISTS users (
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT false
      )`;
    await sql`CREATE TABLE IF NOT EXISTS bucket (
        user_username VARCHAR(255) REFERENCES users(username),
        pet_species VARCHAR(255) REFERENCES pets(species),
        quantity INT,
        CONSTRAINT users_pets_pk PRIMARY KEY(user_username, pet_species)
    )`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
