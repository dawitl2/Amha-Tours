import Link from "next/link";

export function AboutAmaha() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div className="about-copy">
          <p className="eyebrow">A personal way to travel</p>
          <h2 id="about-title">Meet Amaha, your local driver in Addis Ababa</h2>
          <p className="lead">
            Amaha helps visitors get around the city comfortably with direct communication and routes shaped around their plans.
          </p>
          <p>
            Whether you are arriving for a holiday, a business visit or a short stopover, discuss the schedule, pickup and price with Amaha before the ride.
          </p>
          <div className="about-points">
            <span><b>01</b> Direct communication</span>
            <span><b>02</b> Flexible local routes</span>
            <span><b>03</b> Pre-arranged timing</span>
          </div>
          <Link className="button button-dark" href="/book">Say hello to Amaha <span aria-hidden="true">-&gt;</span></Link>
        </div>

        <div className="about-portrait">
          <img src="/Driver photo.png" alt="Amaha standing beside a car in Addis Ababa" />
          <div className="portrait-label">
            <span>Your driver in Addis Ababa</span>
            <strong>Amaha / Private local driver</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
