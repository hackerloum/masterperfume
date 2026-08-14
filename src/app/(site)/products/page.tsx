import { Suspense } from "react";
import ProductsClient from "@/components/ProductsClient";
import StickyCTA from "@/components/StickyCTA";
import Spinner from "@/components/Spinner";
import JsonLd from "@/components/JsonLd";
import { fetchProducts } from "@/lib/data";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "All Perfumes",
  description:
    "Shop Master Perfume fragrances for Men, Women and Unisex in Tanzania. Perfume za kupima — mixed fresh, bottled to order. Search, filter and order on WhatsApp.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Perfumes", path: "/products" },
        ])}
      />
      <JsonLd data={itemListJsonLd(products)} />
      <section className="border-b border-ink/10 bg-white">
        <div className="container-px py-4 sm:py-5">
          <h1 className="text-xl font-bold text-ink sm:text-2xl">All perfumes</h1>
          <p className="mt-1 text-sm text-ink/60">
            Filter by category, search, and order on WhatsApp — no account needed.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <ProductsClient initialProducts={products} />
      </Suspense>

      <StickyCTA label="Chat to Order" href="#" />
    </>
  );
}
