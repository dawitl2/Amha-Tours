import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Contact Amaha before arrival",
    text: "Send a message while planning your trip and describe the ride you need.",
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
          <img src="/A calmer arrival.webp" alt="Traveler riding comfortably in the back seat of a car" />
          <div className="image-note">Bole International Airport / pre-booked service</div>
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
          <Link className="button button-dark" href="/book?destination=Bole%20Airport%20pickup">
            Plan an airport pickup <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
