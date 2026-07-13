import { siteData } from "../data/siteData";
import { Navbar } from "./Navbar";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner shell">
        <Navbar />
        <div className="hero-copy">
          <p className="eyebrow light">Private rides / Addis Ababa</p>
          <h1 id="hero-title">
            <span className="desktop-hero-text">Explore Addis Ababa with a trusted local driver</span>
            <span className="mobile-hero-text">Your easier way around Addis</span>
          </h1>
          <p className="hero-intro">
            <span className="desktop-hero-text">
              Amaha offers pre-booked airport transfers, private city rides and personalized tours, planned directly with you.
            </span>
            <span className="mobile-hero-text">
              Airport pickups, city rides and flexible local tours, arranged directly with Amaha.
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

        <div className="hero-service-strip" aria-label="Amaha Tours highlights">
          {siteData.services.slice(0, 3).map((service) => (
            <article key={service.number}>
              <span>{service.number}</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="word-ribbon" aria-hidden="true">
        <span>explore</span><span>discover</span><span>arrive</span><span>connect</span><span>relax</span>
      </div>
    </section>
  );
}
