import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "./icons";

const categories = [
  {
    name: "Men",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Women",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Unisex",
    category: "Unisex",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="container-px py-4 sm:py-6">
      <div className="section-head">
        <h2 className="section-title">Shop by category</h2>
        <Link href="/products" className="section-link">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {categories.map((c) => (
          <Link
            key={c.category}
            href={`/products?category=${c.category}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-md bg-ink sm:aspect-[16/9]"
          >
            <Image
              src={c.image}
              alt={`${c.name} perfume`}
              fill
              sizes="33vw"
              className="object-cover opacity-80 transition group-hover:opacity-95 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2.5 sm:p-4">
              <h3 className="text-sm font-bold text-white sm:text-lg">{c.name}</h3>
              <IconArrowRight className="h-4 w-4 text-accent" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
