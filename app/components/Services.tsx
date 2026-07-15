"use client";

import { useSiteContent } from "../context/SiteContentContext";

export function Services() {
  const { services, servicesIntro } = useSiteContent();
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="shell">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Travel on your terms</p>
            <h2 id="services-title">Simple, flexible ways to move around Addis</h2>
          </div>
          <p>
            {servicesIntro}
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-icon" aria-hidden="true">{service.symbol}</span>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
