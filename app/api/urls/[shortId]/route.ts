import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortId: string } }
) {
  try {
    const { shortId } = params;
    const url = await prisma.url.findUnique({
      where: {
        shortUrl: shortId,
      },
    });

    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
