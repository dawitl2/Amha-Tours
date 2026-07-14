import { siteData } from "../data/siteData";
import Link from "next/link";

export function HotelTransport() {
  return (
    <section className="hotel-transport section" aria-labelledby="hotel-title">
      <div className="shell">
        <div className="section-heading hotel-heading">
          <div>
            <p className="eyebrow light">Hotel and local transport</p>
            <h2 id="hotel-title">One local driver for the places on your itinerary</h2>
          </div>
          <p>
            Arrange transport between the airport, your hotel, restaurants, offices, markets and visitor attractions.
          </p>
        </div>

        <div className="hotel-grid">
          <div className="hotel-list">
            <p className="example-label">Common pickup areas / no hotel partnership required</p>
            {siteData.hotels.map((hotel, index) => (
              <Link className="hotel-row" href={`/book?destination=${encodeURIComponent(hotel)}`} key={hotel}>
                <span>0{index + 1}</span>
                <strong>{hotel}</strong>
                <span aria-hidden="true">-&gt;</span>
              </Link>
            ))}
          </div>
          <div className="hotel-image image-frame">
            <img src="/Addis highlights.webp" alt="Evening skyline and main roads in Addis Ababa" />
          </div>
        </div>
      </div>
    </section>
  );
}
