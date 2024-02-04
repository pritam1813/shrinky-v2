import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const shortUrl = pathname.split("/")[1];

    const url = await prisma.url.update({
      where: { shortUrl },
      data: { clicks: { increment: 1 } },
    });

    return NextResponse.redirect(url.originalUrl, { status: 307 });
  } catch (error) {
    console.log(error);
  }
}
