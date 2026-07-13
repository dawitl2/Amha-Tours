import { siteData } from "../data/siteData";
import { Navbar } from "./Navbar";

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner shell">
        <Navbar />
        <div className="hero-copy">
          <p className="eyebrow light">Private rides · Addis Ababa</p>
          <h1 id="hero-title">Explore Addis Ababa with a trusted local driver</h1>
          <p className="hero-intro">
            Amaha offers pre-booked airport transfers, private city rides and personalized tours—planned directly with you.
          </p>
          <div className="button-row">
            <a className="button button-lime" href={siteData.contact.whatsappHref}>
              Contact on WhatsApp <span aria-hidden="true">→</span>
            </a>
            <a className="button button-ghost" href="#services">
              View services
            </a>
          </div>
          <p className="trust-line">
            <span aria-hidden="true">✓</span> Pre-booked rides&nbsp; · &nbsp;Airport pickup&nbsp; · &nbsp;Personalized city tours
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
        <span>arrive</span><span>explore</span><span>connect</span><span>discover</span><span>relax</span>
      </div>
    </section>
  );
}

