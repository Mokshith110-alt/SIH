import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { requestId, type, description } = body;

  const report = await prisma.report.create({
    data: {
      userId: user.id,
      requestId,
      type,
      description,
      status: "SUBMITTED",
    },
  });

  return NextResponse.json(report);
}