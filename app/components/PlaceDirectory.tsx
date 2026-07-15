"use client";

import { useState } from "react";
import Link from "next/link";
import { useSiteContent } from "../context/SiteContentContext";

const categoryBySlug: Record<string, string> = {
  "unity-park": "Culture",
  "national-museum": "History",
  "entoto-park": "Nature",
};

const filters = ["All", "Culture", "History", "Nature"];

export function PlaceDirectory() {
  const { places } = useSiteContent();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const directoryPlaces = places.map((place) => ({
    ...place,
    category: categoryBySlug[place.slug] ?? place.cardMeta.split(" /")[0] ?? "Culture",
    directoryId: place.slug,
  }));

  const normalizedQuery = query.trim().toLowerCase();
  const visiblePlaces = directoryPlaces.filter((place) => {
    const matchesFilter = filter === "All" || place.category === filter;
    const searchableText = `${place.name} ${place.cardMeta} ${place.description} ${place.bestFor}`.toLowerCase();
    return matchesFilter && searchableText.includes(normalizedQuery);
  });

  return (
    <section className="directory-section section" aria-labelledby="directory-title">
      <div className="shell">
        <div className="directory-tools">
          <label className="place-search">
            <span>Search places</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try park, museum, history or nature"
            />
          </label>
          <div className="place-filters" aria-label="Filter places">
            {filters.map((item) => (
              <button
                className={filter === item ? "is-active" : ""}
                type="button"
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="directory-result-line">
          <h2 id="directory-title">Places to explore</h2>
          <p aria-live="polite">{visiblePlaces.length} {visiblePlaces.length === 1 ? "place" : "places"}</p>
        </div>

        {visiblePlaces.length > 0 ? (
          <div className="directory-grid">
            {visiblePlaces.map((place, index) => (
              <Link
                className="image-card destination-card directory-card"
                href={`/place?slug=${encodeURIComponent(place.slug)}`}
                key={place.directoryId}
                aria-label={`Explore ${place.name}`}
              >
                <img src={place.images[0].src} alt={place.images[0].alt} />
                <div className="image-card-shade" />
                <div className="image-card-copy">
                  <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                  <p>{place.category} / {place.visitLength}</p>
                  <h3>{place.name}</h3>
                  <p className="card-description">{place.description}</p>
                  <span className="card-cta">View details <span aria-hidden="true">-&gt;</span></span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="directory-empty">
            <h3>No matching places</h3>
            <p>Try a broader search or choose All.</p>
            <button className="button button-dark" type="button" onClick={() => { setQuery(""); setFilter("All"); }}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
