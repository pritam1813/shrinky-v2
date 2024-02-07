import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({
        status: 401,
        message: "You must be logged in.",
      });
    }

    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/")[4];

    const user = await prisma.users.findUnique({
      where: { id },
      include: { urls: true },
    });

    return NextResponse.json(user?.urls, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
