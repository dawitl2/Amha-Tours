"use client";

import { useSearchParams } from "next/navigation";
import { PlaceDetail } from "./PlaceDetail";

export function PlaceFromQuery() {
  const searchParams = useSearchParams();
  return <PlaceDetail slug={searchParams.get("slug") ?? ""} />;
}
