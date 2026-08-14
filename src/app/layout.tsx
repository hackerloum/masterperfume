import type { Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { defaultMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-TZ" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
