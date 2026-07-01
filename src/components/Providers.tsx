"use client";

import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";

/** Client-side app providers (cart + wishlist) for the storefront. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>{children}</CartProvider>
    </WishlistProvider>
  );
}
