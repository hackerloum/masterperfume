import CartClient from "@/components/CartClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cart",
  description: "Review your Master Perfume cart and check out.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return <CartClient />;
}
