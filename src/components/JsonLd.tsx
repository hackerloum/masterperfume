import { jsonLdScript } from "@/lib/seo";

/** Renders a JSON-LD block for Google rich results. */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}
