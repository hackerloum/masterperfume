const messages = [
  "Free delivery within town",
  "Perfumes mixed fresh to order",
  "Order now on WhatsApp",
];

/** Thin promotional strip above the navbar. */
export default function AnnouncementBar() {
  return (
    <div className="bg-accent text-ink">
      <div className="container-px flex h-8 items-center justify-center gap-3 overflow-hidden text-[0.72rem] font-semibold">
        {messages.map((m, i) => (
          <span key={m} className="flex items-center gap-3 whitespace-nowrap">
            {i > 0 && <span className="text-ink/40">•</span>}
            <span className={i === 2 ? "hidden sm:inline" : ""}>{m}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
