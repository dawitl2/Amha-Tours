"use client";

import { useSiteContent } from "../context/SiteContentContext";
import Link from "next/link";

export function JourneyGallery() {
  const { journeys } = useSiteContent();
  return (
    <>
      <div className="journey-grid">
        {journeys.map((journey) => (
          <article className="image-card journey-card" key={journey.name}>
            <img src={journey.image} alt={journey.name} style={{ objectPosition: journey.position }} />
            <div className="image-card-shade" />
            <div className="journey-copy">
              <h3>{journey.name}</h3>
              <p>{journey.meta}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="center-action journey-actions">
        <Link className="button button-lime" href="/book">Arrange your route <span aria-hidden="true">-&gt;</span></Link>
      </div>
    </>
  );
}
