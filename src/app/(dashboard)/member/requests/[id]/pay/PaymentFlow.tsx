"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PricingCalculator from "@/components/PricingCalculator";
import { CreditCard, CheckCircle, ShieldCheck, Loader2 } from "lucide-react";

export default function PaymentFlow({ request, basePrice, distanceKm }: any) {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentState, setPaymentState] = useState<"pending" | "success" | "failed">(
    request.payment?.status === "SUCCESS" ? "success" : "pending"
  );

  const handlePay = async () => {
    setIsProcessing(true);
    // Simulate Gateway redirect & processing
    await new Promise((r) => setTimeout(r, 2500));
    
    try {
      const res = await fetch(\/api/requests/\/pay\, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      if (!res.ok) throw new Error("Payment failed");
      
      setPaymentState("success");
    } catch (err) {
      setPaymentState("failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentState === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-green-800">Payment Successful!</h2>
        <p className="text-green-600">Your payment of ₹{total.toFixed(2)} has been securely processed.</p>
        <button 
          onClick={() => router.push(\/member/requests/\\)}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Return to Booking
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <PricingCalculator 
          basePrice={basePrice} 
          distanceKm={distanceKm} 
          onTotalChange={setTotal} 
        />
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <ShieldCheck className="text-blue-600" /> Secure Payment
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            We use industry-standard encryption to protect your payment details. You will be redirected to our secure gateway.
          </p>
          
          {paymentState === "failed" && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
              Payment failed. Please try again.
            </div>
          )}
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-slate-800 transition disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Processing Securely...
            </>
          ) : (
            <>
              <CreditCard size={20} />
              Pay ₹{total.toFixed(2)} Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}