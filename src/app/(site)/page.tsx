import type { Metadata } from "next";
import HomeMosaic from "@/components/HomeMosaic";
import PromoTiles from "@/components/PromoTiles";
import Benefits from "@/components/Benefits";
import OnSale from "@/components/OnSale";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductSpotlight from "@/components/ProductSpotlight";
import HomeRows from "@/components/HomeRows";
import RecentlyViewed from "@/components/RecentlyViewed";
import CtaBand from "@/components/CtaBand";
import StickyCTA from "@/components/StickyCTA";
import JsonLd from "@/components/JsonLd";
import {
  fetchActiveBanners,
  fetchFeaturedProducts,
  fetchProducts,
} from "@/lib/data";
import { itemListJsonLd, pageMetadata, storeJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const featured = await fetchFeaturedProducts();
  const image = featured.find((p) => p.imageUrl)?.imageUrl;
  return pageMetadata({
    title: "Perfume Shop in Tanzania",
    description:
      "Master Perfume — buy long-lasting perfume in Tanzania. Mixed fresh (perfume za kupima) into the bottle you choose. Order on WhatsApp, no account needed.",
    path: "/",
    images: image ? [image] : undefined,
  });
}

export default async function HomePage() {
  const [products, featured, banners] = await Promise.all([
    fetchProducts(),
    fetchFeaturedProducts(),
    fetchActiveBanners(),
  ]);
  const onSale = products
    .filter((p) => p.discountPercent > 0)
    .sort((a, b) => b.discountPercent - a.discountPercent);

  return (
    <>
      <JsonLd data={storeJsonLd()} />
      <JsonLd data={itemListJsonLd(products)} />
      <HomeMosaic banners={banners} featured={featured} deals={onSale} />
      <Benefits />
      <PromoTiles />
      <OnSale products={onSale} />
      <FeaturedProducts products={featured} />
      <HomeRows products={products} />
      <ProductSpotlight product={featured[0] ?? null} />
      <div className="container-px">
        <RecentlyViewed />
      </div>
      <CtaBand />
      <StickyCTA label="Shop perfumes" href="/products" />
    </>
  );
}
