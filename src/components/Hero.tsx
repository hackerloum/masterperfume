import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { IconArrowRight, IconCheck } from "./icons";
import BottleSilhouette from "./bottle/BottleSilhouette";

const highlights = ["Long-lasting", "Mixed to order", "Delivery available"];

export default function Hero() {
  return (
    <section className="container-px">
      <div className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <p className="eyebrow animate-fade-up">{siteConfig.name}</p>
          <h1 className="mt-4 font-serif text-4xl font-800 leading-[1.05] tracking-tight text-ink animate-fade-up sm:text-6xl">
            Feel unique.
            <br />
            Leave a{" "}
            <span className="text-accent">masterpiece</span>.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/55 animate-fade-up sm:text-lg">
            Premium perfume in Tanzania, mixed fresh (perfume za kupima) and
            poured into the bottle you choose. Order in seconds — no account
            needed. Delivery available.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up">
            <Link href="/products" className="btn-accent">
              Shop perfumes
              <IconArrowRight />
            </Link>
            <Link href="/products" className="btn-ghost-light">
              Explore the collection
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 animate-fade-up">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 text-sm text-ink/60"
              >
                <IconCheck className="h-4 w-4 text-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-cream">
            {/* Soft placeholder bottle (behind any photo) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <BottleSilhouette
                oilColor="#2f7d63"
                className="h-3/4 w-auto opacity-90"
              />
            </div>
            <Image
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80"
              alt="Master Perfume luxury fragrance bottle"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Accent dot detail */}
          <div className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 rounded-full bg-accent/10" />
        </div>
      </div>
    </section>
  );
}
