const messages = [
  "Free delivery within town",
  "Perfumes mixed fresh to order",
  `Order now on WhatsApp`,
];

/** Thin promotional strip above the navbar (classic e-commerce announcement bar). */
export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <div className="container-px flex h-9 items-center justify-center gap-3 overflow-hidden text-[0.72rem] font-medium tracking-wide">
        {messages.map((m, i) => (
          <span key={m} className="flex items-center gap-3 whitespace-nowrap">
            {i > 0 && <span className="text-accent">✦</span>}
            <span className={i === 2 ? "hidden sm:inline" : ""}>{m}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
