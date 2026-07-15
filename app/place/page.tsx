import type { Metadata } from "next";
import { Suspense } from "react";
import { PlaceFromQuery } from "../components/PlaceFromQuery";

export const metadata: Metadata = {
  title: "Addis Place Guide | Amha Tours",
  description: "Plan an Addis Ababa attraction or local destination with Amha Tours.",
};

export default function PlacePage() {
  return <Suspense fallback={<div className="booking-loading">Loading place guide...</div>}><PlaceFromQuery /></Suspense>;
}
