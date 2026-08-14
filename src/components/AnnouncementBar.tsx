"use client";

const messages = [
  "Free delivery within town",
  "Perfumes mixed fresh to order",
  "Order on WhatsApp — no account needed",
  "Today's deals ending soon",
  "Men · Women · Unisex bottles in stock",
];

/** Scrolling promo ticker. */
export default function AnnouncementBar() {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {messages.map((m) => (
        <span key={m} className="flex items-center gap-8 whitespace-nowrap">
          <span>{m}</span>
          <span className="text-ink/35">•</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden bg-ink text-[0.72rem] font-semibold text-accent">
      <div className="flex h-8 w-max items-center animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
