import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { getServerSession } from "next-auth/next";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({
        status: 401,
        message: "You must be logged in.",
      });
    }

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
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({
        status: 401,
        message: "You must be logged in.",
      });
    }

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
