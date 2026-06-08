import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "./icons";

const categories = [
  {
    name: "For Him",
    category: "Men",
    gradient: "from-[#1a2530] to-[#2c3e50]",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "For Her",
    category: "Women",
    gradient: "from-[#5a3a44] to-[#8a5a6a]",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Unisex",
    category: "Unisex",
    gradient: "from-[#3a3528] to-[#6b5d3f]",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="bg-white">
      <div className="container-px py-16 sm:py-24">
        <div className="mb-12 text-center">
          <p className="eyebrow">Find your scent</p>
          <h2 className="mt-3 font-serif text-4xl font-700 text-ink sm:text-5xl">
            Shop by Category
          </h2>
          <div className="accent-rule mt-5" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {categories.map((c) => (
            <Link
              key={c.category}
              href={`/products?category=${c.category}`}
              className={`group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${c.gradient} sm:aspect-[3/4]`}
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-2xl font-700 text-white">
                  {c.name}
                </h3>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent-light">
                  Explore collection
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
