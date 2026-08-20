"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <div>
      <form
        className="grid grid-cols-[1fr_auto] overflow-hidden rounded-[4px] border border-paper-line"
        onSubmit={(e) => {
          e.preventDefault();
          setStatus("sent");
        }}
      >
        <input
          type="email"
          required
          aria-label="Email address"
          placeholder="Enter your email"
          className="h-[46px] bg-white px-4 text-[13px] text-paper-ink placeholder:text-paper-muted"
        />
        <button
          type="submit"
          className="bg-gradient-to-b from-signal to-signal-dim px-7 font-mono text-[11px] font-bold uppercase tracking-wider text-white"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-paper-muted">
        {status === "sent"
          ? "Thanks — you're on the list."
          : "No spam. Unsubscribe anytime."}
      </p>
    </div>
  );
}
