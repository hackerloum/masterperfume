import { IconTruck, IconCheck, IconDroplet, IconWhatsApp } from "./icons";

const items = [
  { Icon: IconCheck, text: "100% authentic oils" },
  { Icon: IconDroplet, text: "Mixed fresh to order" },
  { Icon: IconTruck, text: "Fast delivery available" },
  { Icon: IconCheck, text: "Long-lasting fragrance" },
  { Icon: IconWhatsApp, text: "Order & support on WhatsApp" },
  { Icon: IconCheck, text: "Pay on delivery" },
];

/** Continuously scrolling promo bar (Amazon/Alibaba-style persuasion). */
export default function PromoMarquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm font-medium">
          <it.Icon className="h-4 w-4 text-accent" />
          {it.text}
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden rounded-md bg-ink py-2 text-white">
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
