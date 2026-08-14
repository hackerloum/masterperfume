import Link from "next/link";
import { siteConfig, instagramUrl } from "@/lib/config";
import { faqs } from "@/lib/faqs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ & Delivery",
  description:
    "Ordering, delivery in Tanzania, payment and returns at Master Perfume. Perfume za kupima mixed fresh and delivered to your door.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="container-px max-w-3xl py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ & Delivery", path: "/faq" },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="text-center">
        <p className="eyebrow">Help centre</p>
        <h1 className="mt-3 font-serif text-3xl font-800 text-ink sm:text-4xl">
          FAQ &amp; Delivery
        </h1>
        <p className="mx-auto mt-2 max-w-md text-ink/55">
          Everything you need to know about ordering perfume from{" "}
          {siteConfig.name} in Tanzania.
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
