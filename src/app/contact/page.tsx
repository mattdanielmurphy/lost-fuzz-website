"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website_url: "", // Honeypot
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "", website_url: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <main className="min-h-screen bg-[#0055aa] p-4 sm:p-12 font-[family-name:var(--font-press-start-2p)] text-white text-[10px] sm:text-xs">
      <div className="max-w-3xl mx-auto bg-[#ffffff] border-2 border-black p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Amiga Window Frame */}
        <div className="bg-[#aaaaaa] border-b-2 border-black p-2 flex items-center justify-between text-black mb-1">
          <div className="flex gap-2">
            <div className="w-6 h-4 bg-white border border-black flex items-center justify-center">
               <div className="w-4 h-0.5 bg-black"></div>
            </div>
          </div>
          <div className="uppercase font-bold tracking-widest">Ian Daoust: Contact Me</div>
          <div className="flex gap-2">
            <div className="w-6 h-4 bg-white border border-black"></div>
          </div>
        </div>

        <div className="bg-[#0055aa] p-6 sm:p-10 border border-black space-y-6">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-[#ff8800] border-2 border-white flex-shrink-0 flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              !
            </div>
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl text-[#ff8800] underline uppercase">COMMUNICATION LINK</h1>
              <p className="leading-relaxed">
                INITIATING CONNECTION TO IAN DAOUST...
              </p>
            </div>
          </div>

          {status === "success" ? (
            <div className="bg-white text-black p-8 border-4 border-[#ff8800] space-y-4">
              <h2 className="text-lg font-bold">MESSAGE TRANSMITTED</h2>
              <p>THANK YOU FOR YOUR COMMUNICATION. A CONFIRMATION EMAIL HAS BEEN SENT TO YOUR INBOX.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="bg-[#aaaaaa] border-2 border-black px-4 py-2 text-black hover:bg-white transition-colors"
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden */}
              <div className="hidden">
                <label htmlFor="website_url">Website URL</label>
                <input
                  type="text"
                  id="website_url"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="block text-[#ff8800]">NAME:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white text-black p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#ff8800]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-[#ff8800]">EMAIL:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white text-black p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#ff8800]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-[#ff8800]">MESSAGE:</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white text-black p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#ff8800] resize-none"
                />
              </div>

              {status === "error" && (
                <div className="text-red-500 bg-white p-2 border border-red-500">
                  ERROR: {errorMessage.toUpperCase()}
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <Link href="/" className="bg-[#aaaaaa] border-2 border-black px-4 py-2 text-black hover:bg-white transition-colors flex items-center gap-2">
                  <span className="w-4 h-4 bg-[#ff8800] rounded-full inline-block"></span>
                  BACK
                </Link>
                
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#ff8800] border-2 border-black px-8 py-2 text-white font-bold hover:bg-white hover:text-[#ff8800] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </div>
            </form>
          )}

          <div className="pt-8 border-t border-white/20 space-y-4">
            <div className="flex gap-4 items-center">
              <span className="text-[#ff8800]">DIRECT EMAIL:</span>
              <span className="bg-white text-black px-2 py-1">HELLO@IANDAOUST.COM</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-[#ff8800]">GITHUB:</span>
              <span className="bg-white text-black px-2 py-1">/IANDAOUST</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Amiga Checkmark icons at bottom */}
      <div className="mt-8 flex gap-4 opacity-50 justify-center">
        <div className="w-8 h-8 border-2 border-white flex items-center justify-center italic font-bold">A</div>
        <div className="w-8 h-8 border-2 border-white flex items-center justify-center italic font-bold">V</div>
      </div>
    </main>
  );
}