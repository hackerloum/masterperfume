import HeroBanner from "@/components/HeroBanner";
import PromoTiles from "@/components/PromoTiles";
import Benefits from "@/components/Benefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductSpotlight from "@/components/ProductSpotlight";
import CategoryShowcase from "@/components/CategoryShowcase";
import RecentlyViewed from "@/components/RecentlyViewed";
import CtaBand from "@/components/CtaBand";
import StickyCTA from "@/components/StickyCTA";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <PromoTiles />
      <FeaturedProducts />
      <ProductSpotlight />
      <CategoryShowcase />
      <div className="container-px">
        <RecentlyViewed />
      </div>
      <Benefits />
      <CtaBand />
      <StickyCTA label="Shop Perfumes" href="/products" />
    </>
  );
}
