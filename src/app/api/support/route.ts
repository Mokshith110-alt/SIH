import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { subject, category, description } = body;

  const ticket = await prisma.supportTicket.create({
    data: {
      userId: user.id,
      subject,
      category,
      description,
      status: "OPEN",
    },
  });

  return NextResponse.json(ticket);
}