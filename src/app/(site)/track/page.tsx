import { Suspense } from "react";
import TrackOrder from "@/components/TrackOrder";
import Spinner from "@/components/Spinner";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Track Order",
  description:
    "Track your Master Perfume order in Tanzania with your order code.",
  path: "/track",
  noIndex: true,
});

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-32">
          <Spinner />
        </div>
      }
    >
      <TrackOrder />
    </Suspense>
  );
}
