import { Navbar } from "./Navbar";
import Link from "next/link";

const heroSteps = [
  {
    number: "01",
    title: "Call Amaha directly",
    description: "One quick conversation. No account or booking platform.",
  },
  {
    number: "02",
    title: "Share your plan",
    description: "Tell him your pickup, timing and the places you want to see.",
  },
  {
    number: "03",
    title: "Confirm and ride",
    description: "Agree the time and price, then relax while Amaha handles the route.",
  },
] as const;

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

        <div className="hero-service-strip" aria-label="Three easy steps to arrange a ride">
          {heroSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
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
