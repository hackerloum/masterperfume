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
        <div className="container-px py-14 text-center sm:py-16">
          <p className="eyebrow">The Collection</p>
          <h1 className="mt-3 font-serif text-4xl font-700 text-ink sm:text-5xl">
            Our Perfumes
          </h1>
          <p className="mx-auto mt-3 max-w-md text-ink/55">
            Find your signature scent in Tanzania. Order in seconds — no account
            needed.
          </p>
          <div className="accent-rule mt-5" />
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
