"use client";

import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/config";
import { IconWhatsApp } from "./icons";

/**
 * Sticky bottom call-to-action shown on mobile only.
 * - A primary action (link to products or order anchor)
 * - A quick WhatsApp button
 */
export default function StickyCTA({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const isAnchor = href.startsWith("#");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white p-3 sm:hidden">
      <div className="container-px flex items-center gap-2">
        {isAnchor ? (
          <a href={href} className="btn-accent flex-1">
            {label}
          </a>
        ) : (
          <Link href={href} className="btn-accent flex-1">
            {label}
          </Link>
        )}
        <a
          href={buildWhatsAppLink("Hello Master Perfume! I'd like to order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-dark px-5"
          aria-label="Chat on WhatsApp"
        >
          <IconWhatsApp className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
