import { places } from "../data/places";
import { JourneyGallery } from "./JourneyGallery";
import Link from "next/link";

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
            <Link className="text-link" href="/#contact">Plan a custom route <span aria-hidden="true">-&gt;</span></Link>
          </div>

          <div className="destination-grid">
            {places.map((destination, index) => (
              <Link className="image-card destination-card" href={`/places/${destination.slug}`} key={destination.name} aria-label={`Explore ${destination.name}`}>
                <img src={destination.images[0].src} alt={destination.images[0].alt} />
                <div className="image-card-shade" />
                <div className="image-card-copy">
                  <span className="card-index">0{index + 1}</span>
                  <p>{destination.cardMeta}</p>
                  <h3>{destination.name}</h3>
                  <p className="card-description">{destination.description}</p>
                  <span className="card-cta">Explore the place <span aria-hidden="true">-&gt;</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="journeys section" aria-labelledby="journeys-title">
        <div className="shell">
          <div className="center-heading">
            <p className="eyebrow">Route inspiration</p>
            <h2 id="journeys-title">Journeys you can arrange</h2>
            <p>Start with one idea or combine several. Every route can be adjusted around your arrival time, interests and energy.</p>
          </div>
          <JourneyGallery />
        </div>
      </section>
    </>
  );
}
