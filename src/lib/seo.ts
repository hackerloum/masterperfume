/**
 * Shared SEO helpers: canonical URLs, metadata, and JSON-LD graphs.
 * Keep crawlable pages pointing at SITE_URL so Google does not see
 * duplicate vercel.app vs custom-domain versions.
 */
import type { Metadata } from "next";
import { instagramUrl, salePrice, siteConfig } from "./config";
import { SITE_URL } from "./site";
import type { Product } from "@/types";

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/** Safe JSON for <script type="application/ld+json">. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const defaultTitle = `${siteConfig.name} — ${siteConfig.slogan}`;
const defaultDescription =
  "Buy perfume in Tanzania from Master Perfume. Long-lasting fragrances mixed fresh (perfume za kupima) and poured into the bottle you choose. Order on WhatsApp — no account needed. Delivery available.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  applicationName: siteConfig.name,
  keywords: [
    "Master Perfume",
    "perfume Tanzania",
    "buy perfume online Tanzania",
    "perfume za kupima",
    "fragrance Tanzania",
    "oud perfume",
    "Master Perfume TZ",
    "long lasting perfume",
    "roll on perfume",
  ],
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "shopping",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_TZ",
    url: SITE_URL,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export function pageMetadata({
  title,
  description,
  path,
  images,
  noIndex,
  ogType = "website",
}: {
  title: string;
  description: string;
  path: string;
  images?: string[];
  noIndex?: boolean;
  ogType?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  const ogImages = images?.filter(Boolean).map((url) => ({ url }));
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      type: ogType,
      locale: "en_TZ",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: ogImages?.length ? "summary_large_image" : "summary",
      title,
      description,
      images: images?.filter(Boolean),
    },
  };
}

export function productMetadata(product: Product): Metadata {
  const desc =
    product.description?.replace(/\s+/g, " ").slice(0, 155) ||
    `Buy ${product.name} perfume in Tanzania from Master Perfume. Mixed fresh and poured into the bottle you choose.`;
  const from = product.sizes.length
    ? Math.min(...product.sizes.map((s) => s.price))
    : null;
  const priceBit =
    from != null
      ? ` From ${siteConfig.currency} ${salePrice(from, product.discountPercent).toLocaleString("en-US")}.`
      : "";
  const description = `${desc}${desc.endsWith(".") ? "" : "."}${priceBit}`.slice(
    0,
    160
  );
  return {
    ...pageMetadata({
      title: `${product.name} ${product.category} Perfume`,
      description,
      path: `/products/${product.id}`,
      images: product.imageUrl ? [product.imageUrl] : undefined,
    }),
    openGraph: {
      type: "website",
      locale: "en_TZ",
      url: absoluteUrl(`/products/${product.id}`),
      siteName: siteConfig.name,
      title: `${product.name} | ${siteConfig.name}`,
      description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: SITE_URL,
    slogan: siteConfig.slogan,
    description: defaultDescription,
    sameAs: [instagramUrl()],
    areaServed: { "@type": "Country", name: "Tanzania" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${siteConfig.whatsappNumber}`,
      availableLanguage: ["en", "sw"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: SITE_URL,
    inLanguage: "en-TZ",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function storeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.name,
    url: SITE_URL,
    description: defaultDescription,
    slogan: siteConfig.slogan,
    currenciesAccepted: siteConfig.currency,
    priceRange: "$$",
    areaServed: { "@type": "Country", name: "Tanzania" },
    sameAs: [instagramUrl()],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} perfume collection`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/products/${p.id}`),
      name: p.name,
    })),
  };
}

export function productJsonLd(product: Product) {
  const prices = product.sizes.map((s) =>
    salePrice(s.price, product.discountPercent)
  );
  const low = prices.length ? Math.min(...prices) : undefined;
  const high = prices.length ? Math.max(...prices) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl || undefined,
    sku: product.id,
    brand: { "@type": "Brand", name: siteConfig.name },
    category: `${product.category} perfume`,
    offers: {
      "@type": "AggregateOffer",
      url: absoluteUrl(`/products/${product.id}`),
      priceCurrency: siteConfig.currency,
      lowPrice: low,
      highPrice: high,
      offerCount: product.sizes.length,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
