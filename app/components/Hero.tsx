"use client";

import { Navbar } from "./Navbar";
import Link from "next/link";
import { useSiteContent } from "../context/SiteContentContext";

export function Hero() {
  const { hero } = useSiteContent();
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-image" aria-hidden="true" style={{ backgroundImage: `url(${hero.image})` }} />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner shell">
        <Navbar />
        <div className="hero-copy">
          <p className="eyebrow light">{hero.eyebrow}</p>
          <h1 id="hero-title">
            <span className="desktop-hero-text">{hero.title}</span>
            <span className="mobile-hero-text">{hero.mobileTitle}</span>
          </h1>
          <p className="hero-intro">
            <span className="desktop-hero-text">
              {hero.intro}
            </span>
            <span className="mobile-hero-text">
              {hero.mobileIntro}
            </span>
          </p>
          <div className="button-row">
            <Link className="button button-lime" href="/book">
              Plan your ride <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button-ghost" href="/#services">
              View services
            </Link>
          </div>
          <p className="trust-line">
            <span aria-hidden="true">OK</span> Pre-booked rides / Airport pickup / Personalized city tours
          </p>
        </div>

        <div className="hero-service-strip" aria-label="Three easy steps to arrange a ride">
          {hero.steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="word-ribbon" aria-hidden="true">
        {hero.ribbon.map((word) => <span key={word}>{word}</span>)}
      </div>
    </section>
  );
}
