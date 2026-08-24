"use client";

import { useEffect, useState } from "react";

type Wish = {
  name: string;
  attendance: "Attending" | "Not Attending";
  message: string;
  createdAt: string;
};

export default function Wishes({ guestName }: { guestName?: string }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState(
    guestName && guestName !== "Bapak/Ibu/Saudara/i" ? guestName : "",
  );
  const [attendance, setAttendance] = useState<"Attending" | "Not Attending">(
    "Attending",
  );
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const loadWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      setWishes(data.wishes || []);
    } catch {
      // failed to load, leave list empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishes();
  }, []);

  const attendingCount = wishes.filter(
    (w) => w.attendance === "Attending",
  ).length;
  const notAttendingCount = wishes.filter(
    (w) => w.attendance === "Not Attending",
  ).length;

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attendance, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal mengirim ucapan");
      }

      // Optimistic update: langsung tampilkan ucapan baru tanpa nunggu Google refresh CSV-nya
      setWishes((prev) => [
        { name, attendance, message, createdAt: new Date().toISOString() },
        ...prev,
      ]);
      setName("");
      setMessage("");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim ucapan");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative py-16 px-6 bg-[#265caa]">
      <div className="relative max-w-md mx-auto">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-white/80 mb-2 text-center">
          RSVP &amp; Wishes
        </p>
        <h2 className="font-serif text-2xl bg-gradient-to-r from-white via-[#bcdcff] to-white bg-clip-text text-transparent mb-6 text-center">
          Leave Your Prayers and Wishes
        </h2>

        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl px-6 py-7 space-y-4 mb-8 bg-gradient-to-br from-[#1e4a87]/60 via-[#153a6e]/60 to-[#0f2d54]/60 backdrop-blur-md border border-[#5b9bdb]/30 shadow-[0_8px_30px_rgba(38,92,170,0.35)]"
        >
          <div>
            <label className="font-body text-xs uppercase tracking-wide text-white/70">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              minLength={2}
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[#5b9bdb]/30 bg-white/95 font-body text-sm text-[#1a3a5c] placeholder:text-[#1a3a5c]/40 focus:outline-none focus:ring-2 focus:ring-[#5b9bdb]"
            />
          </div>

          <div>
            <label className="font-body text-xs uppercase tracking-wide text-white/70 block mb-2">
              Confirm Attendance
            </label>
            <div className="flex gap-3">
              {(["Attending", "Not Attending"] as const).map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setAttendance(option)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-body border transition-all duration-300 ${
                    attendance === option
                      ? "bg-gradient-to-r from-[#3a7bd5] to-[#265caa] text-white border-transparent shadow-md shadow-[#265caa]/40"
                      : "border-[#5b9bdb]/30 text-white/70 hover:border-[#5b9bdb]/60"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-body text-xs uppercase tracking-wide text-white/70">
              Prayers &amp; Wishes
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your prayers and wishes..."
              required
              minLength={2}
              rows={3}
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[#5b9bdb]/30 bg-white/95 font-body text-sm text-[#1a3a5c] placeholder:text-[#1a3a5c]/40 focus:outline-none focus:ring-2 focus:ring-[#5b9bdb]"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-gradient-to-r from-[#3a7bd5] via-[#265caa] to-[#1e4a87] text-white font-body text-sm py-3 rounded-full hover:brightness-110 transition-all duration-300 disabled:opacity-60 shadow-lg shadow-[#265caa]/30"
          >
            {sending ? "Sending..." : submitted ? "Send Another Wish" : "Send"}
          </button>
        </form>

        <div className="relative space-y-4 max-h-80 overflow-y-auto pr-1">
          {loading && (
            <p className="text-center text-sm text-white/50 font-body">
              Loading wishes...
            </p>
          )}

          {wishes.map((wish, i) => (
            <div
              key={i}
              className="rounded-xl px-4 py-3 bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10"
            >
              <div className="flex items-center gap-2">
                <p className="font-serif text-white font-semibold text-sm">
                  {wish.name}
                </p>
                <span
                  className={`text-[10px] font-body px-2 py-0.5 rounded-full ${
                    wish.attendance === "Attending"
                      ? "bg-gradient-to-r from-[#3a7bd5]/40 to-[#265caa]/40 text-[#bcdcff]"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {wish.attendance}
                </span>
              </div>
              <p className="font-body text-sm text-white/70 mt-1">
                {wish.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
