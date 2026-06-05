import { IconClock, IconDroplet, IconTag, IconTruck } from "./icons";

const benefits = [
  {
    Icon: IconClock,
    title: "Long Lasting",
    text: "Fragrances that stay with you all day.",
  },
  {
    Icon: IconDroplet,
    title: "Perfume za Kupima",
    text: "Buy by measure — pay only for what you need.",
  },
  {
    Icon: IconTag,
    title: "Affordable Sizes",
    text: "From small testers to full bottles.",
  },
  {
    Icon: IconTruck,
    title: "Delivery Available",
    text: "We deliver right to your location.",
  },
];

export default function Benefits() {
  return (
    <section className="border-y border-ink/10 bg-white">
      <div className="container-px grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-4">
        {benefits.map(({ Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-gold-dark">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
            <p className="mt-1 max-w-[12rem] text-sm leading-relaxed text-ink/55">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
