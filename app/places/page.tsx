import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { PlaceDirectory } from "../components/PlaceDirectory";

export const metadata: Metadata = {
  title: "Explore Addis Places | Amaha Tours",
  description: "Search and filter Addis Ababa parks, museums and local tour ideas, then open a full place guide.",
};

export default function PlacesPage() {
  return (
    <main className="places-directory-page">
      <div className="place-topbar">
        <div className="shell"><Navbar /></div>
      </div>
      <section className="directory-hero" aria-labelledby="places-page-title">
        <div className="shell">
          <p className="eyebrow light">Addis place finder</p>
          <h1 id="places-page-title">Find a stop that fits your day</h1>
          <p>Search the current place ideas or filter by culture, history and nature. Every card opens a complete visit guide.</p>
        </div>
      </section>
      <PlaceDirectory />
      <Footer />
    </main>
  );
}
