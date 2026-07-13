import { siteData } from "../data/siteData";

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
            <p className="example-label">Editable example destinations · not official partnerships</p>
            {siteData.hotels.map((hotel, index) => (
              <div className="hotel-row" key={hotel}>
                <span>0{index + 1}</span>
                <strong>{hotel}</strong>
                <span aria-hidden="true">↗</span>
              </div>
            ))}
          </div>
          <div className="hotel-image image-frame">
            <img src="/addis-city.jpg" alt="Temporary Addis Ababa city image for hotel and local transportation" />
          </div>
        </div>
      </div>
    </section>
  );
}

