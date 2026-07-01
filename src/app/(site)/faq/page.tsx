import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, instagramUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "FAQ & Delivery",
  description:
    "Common questions about ordering, delivery, payment and returns at Master Perfume.",
};

const faqs = [
  {
    q: "How do I order?",
    a: "Browse the perfumes, pick your bottle and size, then add to cart or tap “Buy Now”. Fill in your name, phone and location — no account needed. We’ll confirm on WhatsApp.",
  },
  {
    q: "Do I need an account?",
    a: "No. You can order in seconds without signing up. To check your order later, just use the order code we give you on the Track Order page.",
  },
  {
    q: "What is “perfume za kupima”?",
    a: "We mix the fragrance oil fresh and pour it into the bottle and size you choose, so you only pay for what you need.",
  },
  {
    q: "How long does delivery take?",
    a: "Usually 1–2 days within town. Delivery to other areas is arranged on WhatsApp when we confirm your order.",
  },
  {
    q: "How do I pay?",
    a: "You can pay on delivery, or as agreed with us on WhatsApp. We’ll walk you through it after you place the order.",
  },
  {
    q: "Can I return or exchange?",
    a: "Because each perfume is mixed fresh to order, we can’t accept returns of opened bottles. If there’s a problem with your order, message us on WhatsApp and we’ll make it right.",
  },
  {
    q: "How do I track my order?",
    a: "Use the order code from your confirmation on the Track Order page to see whether it’s pending, contacted or completed.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-px max-w-3xl py-14">
      <div className="text-center">
        <p className="eyebrow">Help centre</p>
        <h1 className="mt-3 font-serif text-3xl font-800 text-ink sm:text-4xl">
          FAQ &amp; Delivery
        </h1>
        <p className="mx-auto mt-2 max-w-md text-ink/55">
          Everything you need to know about ordering from {siteConfig.name}.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-ink/10 bg-white p-5"
          >
            <summary className="cursor-pointer list-none font-medium text-ink marker:hidden">
              <span className="flex items-center justify-between gap-3">
                {f.q}
                <span className="text-ink/40 transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-cream p-6 text-center">
        <p className="text-ink/70">Still have a question?</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn-accent">
            Shop perfumes
          </Link>
          <a
            href={instagramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Message us on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
