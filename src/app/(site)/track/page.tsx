import type { Metadata } from "next";
import { Suspense } from "react";
import TrackOrder from "@/components/TrackOrder";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = {
  title: "Track Order",
  description: "Track your Master Perfume order status with your order code.",
};

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
