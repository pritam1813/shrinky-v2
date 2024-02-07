import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({
        status: 401,
        message: "You must be logged in.",
      });
    }
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

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({
        status: 401,
        message: "You must be logged in.",
      });
    }
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/")[3];
    //Deleting location tables first
    await prisma.location.deleteMany({
      where: { urlId: id },
    });
    await prisma.url.delete({
      where: { id },
    });
    return NextResponse.json({
      status: 200,
      message: "Url deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
