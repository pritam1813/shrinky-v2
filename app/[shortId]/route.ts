import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const shortUrl = pathname.split("/")[1];
    if (shortUrl === "login") {
      return NextResponse.redirect(new URL("/", req.url), {
        status: 307,
      });
    }
    let url = await prisma.url.findUnique({
      where: { shortUrl },
    });

    if (url) {
      url = await prisma.url.update({
        where: { shortUrl },
        data: { clicks: { increment: 1 } },
      });
      return NextResponse.redirect(url.originalUrl, { status: 307 });
    } else {
      return NextResponse.redirect(new URL("/404", req.url), {
        status: 307,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
