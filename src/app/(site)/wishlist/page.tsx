import type { Metadata } from "next";
import WishlistClient from "@/components/WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved Master Perfume fragrances.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
