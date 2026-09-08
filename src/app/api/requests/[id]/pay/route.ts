import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user || user.role !== "MEMBER") return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { amount } = body;

  const request = await prisma.serviceRequest.findUnique({
    where: { id: params.id, memberId: user.id },
  });

  if (!request) return new NextResponse("Not Found", { status: 404 });

  // Simulate payment processing
  const payment = await prisma.payment.create({
    data: {
      requestId: request.id,
      amount,
      status: "SUCCESS",
      gatewayRef: "mock_txn_" + Math.random().toString(36).substr(2, 9),
    },
  });

  // Update total on the request
  await prisma.serviceRequest.update({
    where: { id: request.id },
    data: {
        totalAmount: amount,
    }
  });

  return NextResponse.json(payment);
}