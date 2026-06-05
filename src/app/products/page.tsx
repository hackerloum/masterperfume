import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "@/components/ProductsClient";
import StickyCTA from "@/components/StickyCTA";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = {
  title: "All Perfumes",
  description: "Browse all Master Perfume fragrances for Men, Women and Unisex.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Page header */}
      <section className="border-b border-ink/10 bg-white">
        <div className="container-px py-14 text-center sm:py-16">
          <p className="eyebrow">The Collection</p>
          <h1 className="mt-3 font-serif text-4xl font-700 text-ink sm:text-5xl">
            Our Perfumes
          </h1>
          <p className="mx-auto mt-3 max-w-md text-ink/55">
            Find your signature scent. Order in seconds — no account needed.
          </p>
          <div className="gold-rule mt-5" />
        </div>
      </section>

      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <ProductsClient />
      </Suspense>

      <StickyCTA label="Chat to Order" href="#" />
    </>
  );
}
