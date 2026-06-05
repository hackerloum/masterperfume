import Link from "next/link";
import { siteConfig, instagramUrl, buildWhatsAppLink } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-ink text-cream">
      <div className="container-px grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-white">{siteConfig.name}</p>
          <p className="mt-2 max-w-xs text-sm text-cream/70">
            {siteConfig.slogan}
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-medium uppercase tracking-wider text-gold-light">
            Explore
          </p>
          <ul className="space-y-2 text-cream/80">
            <li>
              <Link href="/" className="hover:text-gold-light">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gold-light">
                All Perfumes
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-medium uppercase tracking-wider text-gold-light">
            Connect
          </p>
          <ul className="space-y-2 text-cream/80">
            <li>
              <a
                href={instagramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-light"
              >
                Instagram @{siteConfig.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppLink("Hello Master Perfume! I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-light"
              >
                Order on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
