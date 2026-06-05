/** Simple trust-building benefits row. */
const benefits = [
  {
    icon: "⏳",
    title: "Long Lasting",
    text: "Fragrances that stay with you all day.",
  },
  {
    icon: "🧴",
    title: "Perfume za Kupima",
    text: "Buy by measure — pay only for what you need.",
  },
  {
    icon: "💰",
    title: "Affordable Sizes",
    text: "From small testers to full bottles.",
  },
  {
    icon: "🚚",
    title: "Delivery Available",
    text: "We deliver right to your location.",
  },
];

export default function Benefits() {
  return (
    <section className="container-px py-12 sm:py-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-ink/10 bg-white p-5 text-center shadow-card"
          >
            <div className="text-3xl">{b.icon}</div>
            <h3 className="mt-3 font-serif text-lg font-600 text-ink">
              {b.title}
            </h3>
            <p className="mt-1 text-sm text-ink/60">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
