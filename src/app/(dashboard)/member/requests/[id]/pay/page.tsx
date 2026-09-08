import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PaymentFlow from "./PaymentFlow";
import { getUser } from "@/lib/auth";

export default async function PayPage({ params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user || user.role !== "MEMBER") return notFound();

  const request = await prisma.serviceRequest.findUnique({
    where: { id: params.id },
    include: { payment: true },
  });

  if (!request) return notFound();

  // Mocking the base price depending on category (In real app, this would be set by the provider)
  const basePrices: Record<string, number> = {
    Electrician: 400,
    Plumber: 350,
    Carpenter: 500,
    Painter: 1200,
    Cleaner: 800,
  };
  const basePrice = basePrices[request.category] || 500;
  const distanceKm = 5; // Mocking distance calculation

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Checkout & Payment</h1>
      <p className="text-gray-500">Review your charges and complete the secure payment.</p>
      
      <PaymentFlow 
        request={request} 
        basePrice={basePrice} 
        distanceKm={distanceKm} 
      />
    </div>
  );
}