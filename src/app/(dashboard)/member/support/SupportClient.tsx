"use client";

import { useState } from "react";
import { HelpCircle, MessageSquare, AlertCircle, Send, CheckCircle2 } from "lucide-react";

export default function SupportClient({ initialTickets }: { initialTickets: any[] }) {
  const [activeTab, setActiveTab] = useState<"faqs" | "tickets" | "feedback">("faqs");
  const [tickets, setTickets] = useState(initialTickets);
  
  // New Ticket State
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("General Query");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Feedback State
  const [rating, setRating] = useState(5);
  const [feedbackCategory, setFeedbackCategory] = useState("App Experience");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, category, description }),
      });
      if (!res.ok) throw new Error("Failed to create ticket");
      const newTicket = await res.json();
      setTickets([newTicket, ...tickets]);
      setSubject("");
      setDescription("");
      setActiveTab("tickets");
    } catch (err) {
      alert("Error creating ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, category: feedbackCategory, comments: feedbackComment }),
      });
      if (!res.ok) throw new Error("Failed to submit feedback");
      setFeedbackSubmitted(true);
    } catch (err) {
      alert("Error submitting feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("faqs")}
          className={\lex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 \\}
        >
          <HelpCircle size={18} /> FAQs
        </button>
        <button
          onClick={() => setActiveTab("tickets")}
          className={\lex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 \\}
        >
          <MessageSquare size={18} /> My Tickets
        </button>
        <button
          onClick={() => setActiveTab("feedback")}
          className={\lex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 \\}
        >
          <AlertCircle size={18} /> Feedback
        </button>
      </div>

      <div className="p-6">
        {activeTab === "faqs" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-2">How is pricing calculated?</h4>
                <p className="text-sm text-gray-600">Our pricing includes a base service charge plus a transport fee (based on distance) and applicable taxes. You can see the full breakdown before paying.</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-2">How do I cancel a request?</h4>
                <p className="text-sm text-gray-600">You can cancel any request that is currently "Pending". Once assigned or in progress, you must contact the provider or support.</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-2">Are all providers verified?</h4>
                <p className="text-sm text-gray-600">Providers with the "Verified" badge have passed our background checks and their certifications have been validated by the cooperative.</p>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h4 className="font-medium mb-2">Still need help?</h4>
              <button 
                onClick={() => setActiveTab("tickets")}
                className="text-sm text-blue-600 hover:underline"
              >
                Open a support ticket &rarr;
              </button>
            </div>
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold">Your Support Tickets</h3>
              {tickets.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500 text-sm">
                  You haven't opened any support tickets yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {tickets.map((ticket: any) => (
                    <div key={ticket.id} className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
                        <p className="text-xs text-gray-500 mt-1">{ticket.category} • {new Date(ticket.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-start">
                        <span className={\px-2.5 py-1 text-xs font-medium rounded-full \\}>
                          {ticket.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
              <h3 className="font-semibold mb-4">Create New Ticket</h3>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={category} onChange={(e) => setCategory(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  >
                    <option>General Query</option>
                    <option>Billing Issue</option>
                    <option>Service Complaint</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    required type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    placeholder="Brief summary..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    required rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    placeholder="Detailed explanation..."
                  />
                </div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Ticket"}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="max-w-2xl mx-auto py-6">
            {feedbackSubmitted ? (
              <div className="text-center space-y-4 py-12">
                <div className="flex justify-center"><CheckCircle2 size={48} className="text-green-500" /></div>
                <h3 className="text-xl font-bold">Thank you for your feedback!</h3>
                <p className="text-gray-500 text-sm">We appreciate your input to help improve CoopServe.</p>
                <button onClick={() => setFeedbackSubmitted(false)} className="text-blue-600 text-sm hover:underline">Submit another response</button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Platform Feedback</h3>
                  <p className="text-sm text-gray-500 mb-6">How was your overall experience with CoopServe?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star} type="button" onClick={() => setRating(star)}
                        className={\p-2 rounded-full transition-colors \\}
                      >
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What is this regarding?</label>
                  <select 
                    value={feedbackCategory} onChange={(e) => setFeedbackCategory(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>App Experience</option>
                    <option>Service Quality</option>
                    <option>Pricing</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                  <textarea 
                    required rows={4} value={feedbackComment} onChange={(e) => setFeedbackComment(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tell us what you loved or what we can improve..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit" disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white rounded-lg py-3 font-medium hover:bg-slate-800 transition disabled:opacity-50"
                  >
                    <Send size={18} /> {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}