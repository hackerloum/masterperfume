import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import StickyCTA from "@/components/StickyCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Benefits />
      <StickyCTA label="Shop Perfumes" href="/products" />
    </>
  );
}
