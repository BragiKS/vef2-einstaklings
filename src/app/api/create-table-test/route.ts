import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE IF NOT EXISTS pets (
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        size_hi INT NOT NULL,
        size_lo INT NOT NULL,
        price INT NOT NULL
    )`;
    /*await sql`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT false
      )`;
    await sql`CREATE TABLE IF NOT EXISTS bucket (
        user_id INT,
        pet_id INT,
        PRIMARY KEY (user_id, pet_id),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id),
        CONSTRAINT fk_pet FOREIGN KEY (pet_id) REFERENCES pet (id)
    )`;*/
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
