"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

interface PricingCalculatorProps {
  basePrice: number;
  distanceKm: number;
  onTotalChange?: (total: number) => void;
}

export default function PricingCalculator({ basePrice, distanceKm, onTotalChange }: PricingCalculatorProps) {
  const [total, setTotal] = useState(0);

  // Constants
  const TRANSPORT_RATE_PER_KM = 10;
  const TAX_RATE = 0.05; // 5% GST

  const transportCharge = distanceKm * TRANSPORT_RATE_PER_KM;
  const subtotal = basePrice + transportCharge;
  const tax = subtotal * TAX_RATE;
  const finalTotal = subtotal + tax;

  useEffect(() => {
    setTotal(finalTotal);
    if (onTotalChange) {
      onTotalChange(finalTotal);
    }
  }, [finalTotal, onTotalChange]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-gray-800">
        <Calculator size={20} className="text-blue-600" />
        <h3 className="font-semibold text-lg">Estimated Pricing Breakdown</h3>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Base Service Charge</span>
          <span className="font-medium">₹{basePrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Transport Fee ({distanceKm} km @ ₹{TRANSPORT_RATE_PER_KM}/km)</span>
          <span className="font-medium">₹{transportCharge.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-100 pt-2 flex justify-between items-center">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Taxes (5% GST)</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-3 flex justify-between items-center font-bold text-lg text-gray-900">
          <span>Estimated Total</span>
          <span>₹{finalTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
        * This is an estimate. Final charges may vary based on additional parts required or extended duration.
      </div>
    </div>
  );
}