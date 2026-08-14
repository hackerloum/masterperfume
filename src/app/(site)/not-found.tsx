import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-px py-24 text-center">
      <h1 className="font-serif text-3xl font-800 text-ink">Page not found</h1>
      <p className="mt-3 text-ink/60">
        This page doesn&apos;t exist. Browse our perfume collection instead.
      </p>
      <Link href="/products" className="btn-accent mt-6">
        Shop perfumes
      </Link>
    </div>
  );
}
