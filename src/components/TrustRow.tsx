import { IconTruck, IconDroplet, IconClock, IconShield } from "./icons";

const items = [
  { Icon: IconClock, title: "Long-lasting", text: "Stays all day" },
  { Icon: IconDroplet, title: "Mixed fresh", text: "Poured to order" },
  { Icon: IconTruck, title: "Delivery", text: "Right to you" },
  { Icon: IconShield, title: "Authentic", text: "Quality oils" },
];

/** Compact trust/benefit badges shown near the order form. */
export default function TrustRow() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(({ Icon, title, text }) => (
        <div
          key={title}
          className="flex items-center gap-2.5 rounded-xl border border-ink/10 bg-white px-3 py-2.5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink">{title}</p>
            <p className="truncate text-[0.7rem] text-ink/50">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
