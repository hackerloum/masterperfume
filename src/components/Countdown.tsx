"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/** Live countdown to a target time (updates every second). */
export default function Countdown({ target }: { target: number }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (now === null) return null;
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);

  const Box = ({ v }: { v: string }) => (
    <span className="rounded-md bg-ink px-2 py-1 font-mono text-sm font-bold text-white">
      {v}
    </span>
  );

  return (
    <span className="inline-flex items-center gap-1">
      <Box v={pad(h)} />
      <span className="text-ink/40">:</span>
      <Box v={pad(m)} />
      <span className="text-ink/40">:</span>
      <Box v={pad(s)} />
    </span>
  );
}
