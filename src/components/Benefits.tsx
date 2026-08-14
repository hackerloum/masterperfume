import { IconClock, IconDroplet, IconTag, IconTruck } from "./icons";

const benefits = [
  {
    Icon: IconClock,
    title: "Long lasting",
    text: "Scents that stay all day.",
  },
  {
    Icon: IconDroplet,
    title: "Perfume za kupima",
    text: "Pay only for the size you need.",
  },
  {
    Icon: IconTag,
    title: "Clear prices",
    text: "Sizes from testers to 100ml.",
  },
  {
    Icon: IconTruck,
    title: "Delivery",
    text: "We deliver to your location.",
  },
];

export default function Benefits() {
  return (
    <section className="border-y border-ink/10 bg-white">
      <div className="container-px grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4">
        {benefits.map(({ Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3 bg-white px-3 py-4 sm:px-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/20 text-ink">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">{title}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-ink/55">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
