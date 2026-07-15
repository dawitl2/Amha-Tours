"use client";

import { useSiteContent } from "../context/SiteContentContext";

export function Testimonials() {
  const { testimonials } = useSiteContent();
  return (
    <section className="testimonials section" aria-labelledby="testimonials-title">
      <div className="shell">
        <div className="center-heading">
          <p className="eyebrow">Guest perspectives</p>
          <h2 id="testimonials-title">Travel that feels personal, not packaged</h2>
          <p>Three traveler stories showing the value of a clear arrival plan and a flexible day in Addis.</p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((review) => (
            <article className="testimonial-card" key={review.name}>
              <div className="quote-mark" aria-hidden="true">&ldquo;</div>
              <p>{review.quote}</p>
              <div className="reviewer">
                <img src={review.image} alt={`Portrait of ${review.name}`} style={{ objectPosition: review.position }} />
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
