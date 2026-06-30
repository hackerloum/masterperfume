import Hero from "@/components/Hero";
import PromoTiles from "@/components/PromoTiles";
import Benefits from "@/components/Benefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductSpotlight from "@/components/ProductSpotlight";
import CategoryShowcase from "@/components/CategoryShowcase";
import CtaBand from "@/components/CtaBand";
import StickyCTA from "@/components/StickyCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoTiles />
      <FeaturedProducts />
      <ProductSpotlight />
      <CategoryShowcase />
      <Benefits />
      <CtaBand />
      <StickyCTA label="Shop Perfumes" href="/products" />
    </>
  );
}
