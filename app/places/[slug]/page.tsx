import type { Metadata } from "next";
import { PlaceDetail } from "../../components/PlaceDetail";
import { getPlace, places } from "../../data/places";

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlace(slug);
  return place ? { title: `${place.name} | Amha Tours`, description: place.description } : {};
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PlaceDetail slug={slug} />;
}
