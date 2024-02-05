import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";

export async function GET() {
  try {
    const urls = await prisma.url.findMany();
    return NextResponse.json(urls, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { longUrl, userId } = await req.json();

    const nanoid = customAlphabet(`${process.env.CUSTOM_ALPHABET_STRING}`, 7);

    const shorturl = await prisma.url.create({
      data: {
        originalUrl: longUrl,
        shortUrl: nanoid(),
        clicks: 0,
        users: { connect: { id: userId } },
      },
    });

    return NextResponse.json(shorturl, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, newUrl } = await req.json();

    await prisma.url.update({
      where: { id },
      data: {
        originalUrl: newUrl,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Url Updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
