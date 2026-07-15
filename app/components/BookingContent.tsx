"use client";

import { useSearchParams } from "next/navigation";
import { Contact } from "./Contact";

export function BookingContent() {
  const searchParams = useSearchParams();
  return <Contact defaultDestination={searchParams.get("destination") ?? ""} />;
}
