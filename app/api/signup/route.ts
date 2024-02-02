import prisma from "@/prisma/client";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface formDataType {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, password } = data as formDataType;

    let user = await prisma.users.findUnique({
      where: { email },
    });

    if (user) {
      return NextResponse.json({ status: 400, message: "User already exists" });
    } else {
      const hashed_password = await hash(password, 10);
      user = await prisma.users.create({
        data: {
          name,
          email,
          password: hashed_password,
        },
      });
      return NextResponse.json({ status: 201 });
    }
  } catch (error) {
    console.log(error);
  }
}
