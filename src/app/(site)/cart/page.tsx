import type { Metadata } from "next";
import CartClient from "@/components/CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Master Perfume cart and check out.",
};

export default function CartPage() {
  return <CartClient />;
}
