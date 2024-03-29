import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

type Params = {
  slug: string;
};

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const { price } = await request.json();

    const result =
      await sql`UPDATE pets SET price = ${price} WHERE species=${params.slug}`;

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Species not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Price updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const result = await sql`DELETE FROM pets WHERE species=${params.slug}`;

    if (!result) {
      return NextResponse.json(
        { message: "Species not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Pet deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
