import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { rating, category, comments } = body;

  const feedback = await prisma.feedback.create({
    data: {
      userId: user.id,
      rating,
      category,
      comments,
    },
  });

  return NextResponse.json(feedback);
}