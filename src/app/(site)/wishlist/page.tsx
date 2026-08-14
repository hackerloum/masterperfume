import WishlistClient from "@/components/WishlistClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Wishlist",
  description: "Your saved Master Perfume fragrances.",
  path: "/wishlist",
  noIndex: true,
});

export default function WishlistPage() {
  return <WishlistClient />;
}
