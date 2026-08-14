import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { IconArrowRight, IconCheck } from "./icons";
import BottleSilhouette from "./bottle/BottleSilhouette";

const highlights = ["Long-lasting", "Mixed to order", "Delivery available"];

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="container-px grid items-center gap-6 py-6 sm:py-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-wide text-accent-dark">
            {siteConfig.name} · Tanzania
          </p>
          <h1 className="mt-2 text-3xl font-800 leading-tight text-ink sm:text-4xl">
            Shop perfumes online
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">
            Perfume za kupima — mixed fresh and poured into the bottle you
            choose. Browse sizes, compare prices, and order on WhatsApp. No
            account needed.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/products" className="btn-accent">
              Shop all perfumes
              <IconArrowRight />
            </Link>
            <Link href="/products?sort=discount" className="btn-outline">
              Today&apos;s deals
            </Link>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-1.5 text-sm text-ink/70">
                <IconCheck className="h-4 w-4 text-accent-dark" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-md bg-cream sm:aspect-[5/3]">
            <div className="absolute inset-0 flex items-center justify-center">
              <BottleSilhouette
                oilColor="#C9A227"
                className="h-3/4 w-auto opacity-90"
              />
            </div>
            <Image
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80"
              alt="Master Perfume fragrance bottle"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
