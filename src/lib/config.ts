/**
 * Centralised, easy-to-change site configuration.
 * Values come from environment variables with sensible fallbacks so the site
 * still renders in development before env is configured.
 */

export const siteConfig = {
  name: "Master Perfume",
  slogan: "Feel Unique, Leave a Masterpiece",
  /** WhatsApp number in international format (digits only, no +). */
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "255712345678",
  instagramHandle:
    process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE?.replace(/^@/, "") || "masterperfumetz",
  currency: "TZS",
};

/** Format a number as a price string, e.g. 25000 -> "TZS 25,000". */
export function formatPrice(amount: number): string {
  return `${siteConfig.currency} ${amount.toLocaleString("en-US")}`;
}

/** Build a wa.me link with a pre-filled, URL-encoded message. */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function instagramUrl(): string {
  return `https://instagram.com/${siteConfig.instagramHandle}`;
}
