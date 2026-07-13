import { siteData } from "../data/siteData";

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
            Whether you are arriving for a holiday, a business visit or a short stopover, you can discuss the schedule, pickup and price with Amaha before the ride.
          </p>
          <div className="about-points">
            <span><b>01</b> Direct communication</span>
            <span><b>02</b> Flexible local routes</span>
            <span><b>03</b> Pre-arranged timing</span>
          </div>
          <a className="button button-dark" href={siteData.contact.whatsappHref}>Say hello to Amaha <span aria-hidden="true">→</span></a>
        </div>

        <div className="about-portrait">
          <img src="/addis-city.jpg" alt="Temporary profile image placeholder showing Addis Ababa" />
          <div className="portrait-label">
            <span>Profile image placeholder</span>
            <strong>Amaha · Private local driver</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

