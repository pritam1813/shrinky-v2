import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const { longUrl } = await req.json();

    const nanoid = customAlphabet(`${process.env.CUSTOM_ALPHABET_STRING}`, 7);

    const shorturl = await prisma.Url.create({
      data: {
        originalUrl: longUrl,
        shortUrl: nanoid(),
      },
    });

    return NextResponse.json(shorturl, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
