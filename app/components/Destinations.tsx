import { siteData } from "../data/siteData";

export function Destinations() {
  return (
    <>
      <section className="destinations section" id="explore" aria-labelledby="destinations-title">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Where would you like to go?</p>
              <h2 id="destinations-title">Explore Addis with local help</h2>
            </div>
            <a className="text-link" href="#contact">Plan a custom route <span aria-hidden="true">↗</span></a>
          </div>

          <div className="destination-grid">
            {siteData.destinations.map((destination, index) => (
              <article className="image-card destination-card" key={destination.name}>
                <img
                  src="/addis-city.jpg"
                  alt={`Temporary Addis Ababa image placeholder for ${destination.name}`}
                  style={{ objectPosition: destination.position }}
                />
                <div className="image-card-shade" />
                <div className="image-card-copy">
                  <span className="card-index">0{index + 1}</span>
                  <p>{destination.meta}</p>
                  <h3>{destination.name}</h3>
                  <p className="card-description">{destination.description}</p>
                  <a href={siteData.contact.whatsappHref}>Ask Amaha <span aria-hidden="true">→</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="journeys section" aria-labelledby="journeys-title">
        <div className="shell">
          <div className="center-heading">
            <p className="eyebrow">Route inspiration</p>
            <h2 id="journeys-title">Journeys you can arrange</h2>
            <p>Examples only—every ride is organized directly around your plans.</p>
          </div>
          <div className="journey-grid">
            {siteData.journeys.map((journey) => (
              <article className="image-card journey-card" key={journey.name}>
                <img
                  src="/addis-city.jpg"
                  alt={`Temporary Addis Ababa image placeholder for ${journey.name}`}
                  style={{ objectPosition: journey.position }}
                />
                <div className="image-card-shade" />
                <div className="journey-copy">
                  <h3>{journey.name}</h3>
                  <p>{journey.meta}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="center-action">
            <a className="button button-lime" href="#contact">Arrange your route <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
    </>
  );
}

