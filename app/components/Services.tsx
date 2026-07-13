import { siteData } from "../data/siteData";

export function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="shell">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Travel on your terms</p>
            <h2 id="services-title">Simple, flexible ways to move around Addis</h2>
          </div>
          <p>
            Choose one ride or plan a full day. Your timing, route and price are confirmed directly with Amaha before the trip.
          </p>
        </div>

        <div className="service-grid">
          {siteData.services.map((service) => (
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

