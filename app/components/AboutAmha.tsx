"use client";

import Link from "next/link";
import { useSiteContent } from "../context/SiteContentContext";

export function AboutAmha() {
  const { person } = useSiteContent();
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div className="about-copy">
          <p className="eyebrow">A personal way to travel</p>
          <h2 id="about-title">Meet {person.name}, your local driver in Addis Ababa</h2>
          <p className="lead">{person.intro}</p>
          <p>{person.description}</p>
          <div className="about-points">
            <span><b>01</b> Direct communication</span>
            <span><b>02</b> Flexible local routes</span>
            <span><b>03</b> Pre-arranged timing</span>
          </div>
          <Link className="button button-dark" href="/book">Say hello to {person.name} <span aria-hidden="true">-&gt;</span></Link>
        </div>
        <div className="about-portrait">
          <img src={person.photo} alt={`${person.name} standing beside a car in Addis Ababa`} />
          <div className="portrait-label"><span>Your driver in Addis Ababa</span><strong>{person.name} / {person.role}</strong></div>
        </div>
      </div>
    </section>
  );
}
