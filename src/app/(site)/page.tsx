import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryShowcase from "@/components/CategoryShowcase";
import CtaBand from "@/components/CtaBand";
import StickyCTA from "@/components/StickyCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <CategoryShowcase />
      <CtaBand />
      <StickyCTA label="Shop Perfumes" href="/products" />
    </>
  );
}
