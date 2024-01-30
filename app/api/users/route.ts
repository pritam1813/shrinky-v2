import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const allUsers = await prisma.users.findMany();
  return NextResponse.json(allUsers, { status: 201 });
}