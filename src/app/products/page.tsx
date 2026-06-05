import type { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";
import StickyCTA from "@/components/StickyCTA";

export const metadata: Metadata = {
  title: "All Perfumes",
  description: "Browse all Master Perfume fragrances for Men, Women and Unisex.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="container-px pt-10">
        <h1 className="font-serif text-3xl font-700 text-ink sm:text-4xl">
          Our Perfumes
        </h1>
        <p className="mt-2 text-ink/60">
          Find your signature scent. Order in seconds — no account needed.
        </p>
      </section>
      <ProductsClient />
      <StickyCTA label="Chat to Order" href="#" />
    </>
  );
}
