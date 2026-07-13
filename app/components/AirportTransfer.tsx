import { siteData } from "../data/siteData";

const steps = [
  {
    number: "01",
    title: "Contact Amaha before arrival",
    text: "Send a WhatsApp message, call or email while planning your trip.",
  },
  {
    number: "02",
    title: "Share flight and hotel details",
    text: "Confirm your arrival time, terminal and destination directly with Amaha.",
  },
  {
    number: "03",
    title: "Meet at Bole Airport",
    text: "Amaha confirms the meeting point, schedule and price before your travel day.",
  },
];

export function AirportTransfer() {
  return (
    <section className="airport section" aria-labelledby="airport-title">
      <div className="shell split-intro">
        <div className="airport-image image-frame">
          <img src="/addis-city.jpg" alt="Temporary Addis Ababa city image used for the airport transfer section" />
          <div className="image-note">Bole International Airport · pre-booked service</div>
        </div>

        <div className="airport-copy">
          <p className="eyebrow">A calmer arrival</p>
          <h2 id="airport-title">Your Addis pickup, planned before you land</h2>
          <p className="lead">
            No account or app is needed. Arrange the pickup directly with Amaha and receive a clear meeting plan before arrival.
          </p>
          <div className="steps">
            {steps.map((step) => (
              <article className="step" key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
          <a className="button button-dark" href={siteData.contact.whatsappHref}>
            Plan an airport pickup <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

