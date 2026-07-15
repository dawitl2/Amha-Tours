import type { MetadataRoute } from "next";
import { places } from "./data/places";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://amhatours.com.et";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/places/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/book/`, changeFrequency: "monthly", priority: 0.8 },
    ...places.map((place) => ({ url: `${base}/places/${place.slug}/`, changeFrequency: "monthly" as const, priority: 0.75 })),
  ];
}
