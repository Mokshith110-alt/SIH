import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import SupportClient from "./SupportClient";
import { notFound } from "next/navigation";

export default async function SupportPage() {
  const user = await getUser();
  if (!user || user.role !== "MEMBER") return notFound();

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Customer Care</h1>
        <p className="text-gray-500">Need help? We're here for you.</p>
      </div>

      <SupportClient initialTickets={tickets} />
    </div>
  );
}