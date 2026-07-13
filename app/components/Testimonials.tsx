import { siteData } from "../data/siteData";

export function Testimonials() {
  return (
    <section className="testimonials section" aria-labelledby="testimonials-title">
      <div className="shell">
        <div className="center-heading">
          <p className="eyebrow">Temporary review content</p>
          <h2 id="testimonials-title">What a personal trip can feel like</h2>
          <p>These sample testimonials are placeholders and are not presented as verified customer reviews.</p>
        </div>

        <div className="testimonial-grid">
          {siteData.testimonials.map((review) => (
            <article className="testimonial-card" key={review.name}>
              <div className="quote-mark" aria-hidden="true">“</div>
              <p>{review.quote}</p>
              <div className="reviewer">
                <img src="/addis-city.jpg" alt="" style={{ objectPosition: review.position }} />
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.trip}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

