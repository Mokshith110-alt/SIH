"use client";

import { useState } from "react";
import { AlertTriangle, X, Send } from "lucide-react";

export default function ReportModal({ requestId, onClose }: { requestId: string; onClose: () => void }) {
  const [type, setType] = useState("No Show");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, type, description }),
      });
      if (!res.ok) throw new Error("Failed to report");
      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch {
      alert("Error submitting report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-rose-50/50">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="text-rose-600" size={20} /> Report an Issue
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center text-green-700">
            <div className="font-semibold mb-2">Report Submitted</div>
            <p className="text-sm opacity-80">Our trust & safety team will review this shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
              <select 
                value={type} onChange={e => setType(e.target.value)}
                className="w-full border-gray-300 rounded-lg text-sm focus:ring-rose-500 focus:border-rose-500"
              >
                <option>No Show</option>
                <option>Unprofessional Behavior</option>
                <option>Damage to Property</option>
                <option>Overcharging</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
              <textarea 
                required rows={4} value={description} onChange={e => setDescription(e.target.value)}
                className="w-full border-gray-300 rounded-lg text-sm focus:ring-rose-500 focus:border-rose-500"
                placeholder="Please describe exactly what happened..."
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 disabled:opacity-50 flex justify-center items-center gap-2">
                {isSubmitting ? "Submitting..." : <><Send size={16} /> Submit Report</>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}