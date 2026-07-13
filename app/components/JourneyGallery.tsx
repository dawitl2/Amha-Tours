"use client";

import { useState } from "react";
import { siteData } from "../data/siteData";
import Link from "next/link";

const initialCount = 5;

export function JourneyGallery() {
  const [expanded, setExpanded] = useState(false);
  const journeys = expanded ? siteData.journeys : siteData.journeys.slice(0, initialCount);

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
        <button className="button button-outline-dark" type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
          {expanded ? "Show fewer ideas" : "Show 3 more ideas"}
        </button>
        <Link className="button button-lime" href="/#contact">Arrange your route <span aria-hidden="true">-&gt;</span></Link>
      </div>
    </>
  );
}
